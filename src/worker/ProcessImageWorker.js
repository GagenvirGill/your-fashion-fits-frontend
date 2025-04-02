// src/worker/ProcessImageWorker.js
import {
	compressImage,
	imgBackgroundRemoval,
	removeTransparentEdges,
} from "../api/Img";

self.onmessage = async (event) => {
	const { taskId, imageFile } = event.data;
	try {
		const compressedImgFile = await compressImage(imageFile, 750, null);
		const bgrndRemBlob = await imgBackgroundRemoval(compressedImgFile);
		const croppedBlob = await removeTransparentEdges(bgrndRemBlob);

		const cmprssBgrndRemCropFile = new File([croppedBlob], "img.png", {
			type: "image/png",
		});

		const finalCompressedFile = await compressImage(
			cmprssBgrndRemCropFile,
			null,
			0.25
		);

		self.postMessage({
			taskId,
			success: true,
			data: finalCompressedFile,
		});
	} catch (err) {
		self.postMessage({
			taskId,
			success: false,
			message: err,
		});
	}
};
