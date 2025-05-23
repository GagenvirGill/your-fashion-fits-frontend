import { removeBackground } from "@imgly/background-removal";
import { Image as ImageJS } from "image-js";
import imageCompression from "browser-image-compression";

export const processImage = async (imageFile) => {
	try {
		const initialCompression = await compressImage(imageFile, 750, null);
		const bgrndRemBlob = await imgBackgroundRemoval(initialCompression);
		const croppedBuffer = await removeTransparentEdges(bgrndRemBlob);

		const croppedFile = new File([croppedBuffer], "img.png", {
			type: "image/png",
		});

		const finalCompressionFile = await compressImage(
			croppedFile,
			null,
			0.5
		);

		return finalCompressionFile;
	} catch (err) {
		console.error(`Error removing edges: ${err}`);
		throw err;
	}
};

const compressImage = async (imgFile, maxEdgeSize, maxMB) => {
	try {
		let compressedImgFile;

		if (maxEdgeSize) {
			compressedImgFile = await imageCompression(imgFile, {
				maxWidthOrHeight: maxEdgeSize,
			});
		} else {
			compressedImgFile = await imageCompression(imgFile, {
				maxSizeMB: maxMB,
			});
		}

		return compressedImgFile;
	} catch (err) {
		console.error(`Error scaling image: ${err}`);
	}
};

const imgBackgroundRemoval = async (imgFile) => {
	try {
		const blob = await removeBackground(imgFile, {
			device: "gpu",
			model: "isnet_fp16",
			output: {
				format: "image/png",
				quality: 0.8,
			},
		});

		return blob;
	} catch (err) {
		console.error(`Error removing background: ${err}`);
		throw err;
	}
};

const removeTransparentEdges = async (blob) => {
	try {
		const arrayBuffer = await blob.arrayBuffer();
		const img = await ImageJS.load(arrayBuffer);

		const croppedImg = img.cropAlpha({
			threshold: 50,
		});

		const croppedBuffer = croppedImg.toBuffer();
		return croppedBuffer;
	} catch (err) {
		console.error(`Error removing edges: ${err}`);
		throw err;
	}
};
