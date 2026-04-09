import * as ort from "onnxruntime-web";
import { fetchModel } from "../util/modelCache.js";

const IDLE_TIMEOUT_MS = 60_000;
const MODEL_INPUT_SIZE = 1024;

let session = null;
let sessionPromise = null;
let idleTimer = null;

function resetIdleTimer() {
	if (idleTimer) clearTimeout(idleTimer);
	idleTimer = setTimeout(() => {
		if (session) {
			session.release();
			session = null;
			sessionPromise = null;
		}
	}, IDLE_TIMEOUT_MS);
}

async function getSession() {
	if (session) return session;
	if (sessionPromise) return sessionPromise;

	sessionPromise = (async () => {
		const modelBuffer = await fetchModel();
		const s = await ort.InferenceSession.create(modelBuffer, {
			executionProviders: ["webgpu", "wasm"],
		});
		session = s;
		return s;
	})();

	return sessionPromise;
}

function compressImage(blob, maxEdge) {
	return createImageBitmap(blob).then((bitmap) => {
		const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
		const w = Math.round(bitmap.width * scale);
		const h = Math.round(bitmap.height * scale);

		const canvas = new OffscreenCanvas(w, h);
		const ctx = canvas.getContext("2d");
		ctx.drawImage(bitmap, 0, 0, w, h);
		bitmap.close();

		return { canvas, width: w, height: h };
	});
}

function canvasToTensor(canvas) {
	const tensorCanvas = new OffscreenCanvas(MODEL_INPUT_SIZE, MODEL_INPUT_SIZE);
	const ctx = tensorCanvas.getContext("2d");
	ctx.drawImage(canvas, 0, 0, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE);
	const { data } = ctx.getImageData(0, 0, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE);

	const totalPixels = MODEL_INPUT_SIZE * MODEL_INPUT_SIZE;
	const float32 = new Float32Array(3 * totalPixels);
	for (let i = 0; i < totalPixels; i++) {
		float32[i] = data[i * 4] / 255;
		float32[i + totalPixels] = data[i * 4 + 1] / 255;
		float32[i + 2 * totalPixels] = data[i * 4 + 2] / 255;
	}

	return new ort.Tensor("float32", float32, [
		1,
		3,
		MODEL_INPUT_SIZE,
		MODEL_INPUT_SIZE,
	]);
}

function applyMask(canvas, width, height, maskData) {
	const ctx = canvas.getContext("2d");
	const imageData = ctx.getImageData(0, 0, width, height);
	const pixels = imageData.data;

	for (let i = 0; i < width * height; i++) {
		const x = i % width;
		const y = (i / width) | 0;
		const mx = ((x * MODEL_INPUT_SIZE) / width) | 0;
		const my = ((y * MODEL_INPUT_SIZE) / height) | 0;
		pixels[i * 4 + 3] = (maskData[my * MODEL_INPUT_SIZE + mx] * 255 + 0.5) | 0;
	}

	ctx.putImageData(imageData, 0, 0);
}

function cropTransparentEdges(canvas, width, height) {
	const ctx = canvas.getContext("2d");
	const { data } = ctx.getImageData(0, 0, width, height);

	let top = height,
		left = width,
		bottom = 0,
		right = 0;
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (data[(y * width + x) * 4 + 3] > 128) {
				if (y < top) top = y;
				if (y > bottom) bottom = y;
				if (x < left) left = x;
				if (x > right) right = x;
			}
		}
	}

	if (top > bottom || left > right) {
		return { canvas, width, height };
	}

	const cropW = right - left + 1;
	const cropH = bottom - top + 1;
	const cropped = new OffscreenCanvas(cropW, cropH);
	const croppedCtx = cropped.getContext("2d");
	croppedCtx.drawImage(canvas, left, top, cropW, cropH, 0, 0, cropW, cropH);

	return { canvas: cropped, width: cropW, height: cropH };
}

async function finalCompress(canvas, maxSizeMB) {
	const maxBytes = maxSizeMB * 1024 * 1024;

	const png = await canvas.convertToBlob({ type: "image/png" });
	if (png.size <= maxBytes) return png;

	let lo = 0.1,
		hi = 0.9;
	let best = png;
	while (hi - lo > 0.05) {
		const mid = (lo + hi) / 2;
		const compressed = await canvas.convertToBlob({
			type: "image/webp",
			quality: mid,
		});
		if (compressed.size <= maxBytes) {
			best = compressed;
			lo = mid;
		} else {
			hi = mid;
		}
	}

	return best;
}

async function processImage(file) {
	resetIdleTimer();

	const { canvas, width, height } = await compressImage(file, MODEL_INPUT_SIZE);
	const tensor = canvasToTensor(canvas);

	const inferenceSession = await getSession();
	const inputName = inferenceSession.inputNames[0];
	const results = await inferenceSession.run({ [inputName]: tensor });
	const outputName = inferenceSession.outputNames[0];
	const maskData = results[outputName].data;

	applyMask(canvas, width, height, maskData);
	const cropped = cropTransparentEdges(canvas, width, height);
	const finalBlob = await finalCompress(cropped.canvas, 1);

	return finalBlob;
}

self.onmessage = async (e) => {
	if (e.data.preload) {
		getSession();
		return;
	}

	const { id, file } = e.data;
	try {
		const result = await processImage(file);
		const buffer = await result.arrayBuffer();
		self.postMessage({ id, result: buffer, type: result.type }, [buffer]);
	} catch (err) {
		self.postMessage({ id, error: err.message });
	}
};
