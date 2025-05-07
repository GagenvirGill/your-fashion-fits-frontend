// src/worker/ProcessImageWorker.js
import {
	compressImage,
	imgBackgroundRemoval,
	removeTransparentEdges,
} from "../api/Img";

self.onmessage = async (event) => {
	const { taskId, imageFile } = event.data;
	try {
		const initialCompression = await compressImage(imageFile, null, 0.5);
		const bgrndRemBlob = await imgBackgroundRemoval(initialCompression);
		const croppedBuffer = await removeTransparentEdges(bgrndRemBlob);

		const croppedFile = new File([croppedBuffer], "img.png", {
			type: "image/png",
		});

		const finalCompressionFile = await compressImage(
			croppedFile,
			750,
			null
		);

		self.postMessage({
			taskId,
			success: true,
			data: finalCompressionFile,
		});
	} catch (err) {
		self.postMessage({
			taskId,
			success: false,
			message: err,
		});
	}
};
