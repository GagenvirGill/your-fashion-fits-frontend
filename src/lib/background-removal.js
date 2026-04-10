// Webpack-compatible worker import (replaces Vite's ?worker syntax)

let worker = null;
let messageId = 0;
const pending = new Map();
let queue = Promise.resolve();

function getWorker() {
	if (!worker) {
		worker = new Worker(
			new URL("./segmentation-worker.js", import.meta.url)
		);
		worker.onmessage = (e) => {
			const { id, result, error } = e.data;
			const resolver = pending.get(id);
			if (!resolver) return;
			pending.delete(id);

			if (error) {
				resolver.reject(new Error(error));
			} else {
				resolver.resolve(new Blob([result], { type: e.data.type }));
			}
		};
	}
	return worker;
}

async function sendToWorker(file) {
	const buffer = await file.arrayBuffer();
	const blob = new Blob([buffer], { type: file.type });
	return new Promise((resolve, reject) => {
		const id = messageId++;
		pending.set(id, { resolve, reject });
		getWorker().postMessage({ id, file: blob });
	});
}

export function preloadSession() {
	getWorker().postMessage({ preload: true });
}

export async function processImage(imageFile) {
	const task = () => sendToWorker(imageFile);
	queue = queue.then(task, task);
	const blob = await queue;
	return new File([blob], "img.png", { type: blob.type });
}
