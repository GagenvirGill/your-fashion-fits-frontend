import { removeBackground } from "@imgly/background-removal";
import Image from "image-js";

export const imgBackgroundRemoval = async (imgPath) => {
	try {
		const blob = await removeBackground(imgPath, {
			output: {
				format: "image/png",
			},
		});
		const croppedBuffer = await removeTransparentEdges(blob);
		const file = new File([croppedBuffer], "img.png", {
			type: "image/png",
		});
		return file;
	} catch (err) {
		console.log(`Error removing background: ${err}`);
		throw err;
	}
};

const removeTransparentEdges = async (blob) => {
	const arrayBuffer = await blob.arrayBuffer();
	const img = await Image.load(arrayBuffer);

	const croppedImg = img.cropAlpha({
		threshold: 50,
	});

	const croppedBuffer = croppedImg.toBuffer();
	return croppedBuffer;
};
