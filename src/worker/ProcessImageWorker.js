// src/worker/ProcessImageWorker.js
import { imgBackgroundRemoval } from "../api/Img";

self.onmessage = async (event) => {
	const { taskId, imageFile } = event.data;
	try {
		const bgrndRemBlob = await imgBackgroundRemoval(imageFile);

		const croppedFile = new File([bgrndRemBlob], "img.png", {
			type: "image/png",
		});

		self.postMessage({
			taskId,
			success: true,
			data: croppedFile,
		});
	} catch (err) {
		self.postMessage({
			taskId,
			success: false,
			message: err,
		});
	}
};
