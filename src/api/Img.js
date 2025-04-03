import { removeBackground } from "@imgly/background-removal";
import { Image } from "image-js";
import imageCompression from "browser-image-compression";

export const compressImage = async (imgFile, maxEdgeSize, maxMB) => {
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
		console.log(`Error scaling image: ${err}`);
	}
};

export const imgBackgroundRemoval = async (imgFile) => {
	try {
		const blob = await removeBackground(imgFile, {
			output: {
				debug: true,
				output: {
					format: "image/png",
				},
			},
		});

		return blob;
	} catch (err) {
		console.error(`Error removing background: ${err}`);
		throw err;
	}
};

export const removeTransparentEdges = async (blob) => {
	try {
		const arrayBuffer = await blob.arrayBuffer();
		const img = await Image.load(arrayBuffer);

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
