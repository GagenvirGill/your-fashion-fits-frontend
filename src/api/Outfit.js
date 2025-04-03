import ax from "./axiosConfig";
import { workerPool } from "../worker/WorkerPool";

export const getAllOutfits = async () => {
	try {
		const response = await ax.get("/outfit");
		if (response.data.success === true) {
			console.log(response.data.message);
			return response.data.data;
		} else {
			console.error(response.data.message);
			alert(response.data.message);
		}
	} catch (err) {
		console.error(err);
		alert("Something went wrong when getting outfits");
	}
};

export const getItemsForAnOutfit = async (outfitId) => {
	try {
		const response = await ax.get(`/outfit/${outfitId}/items`);
		if (response.data.success === true) {
			console.log(response.data.message);
			return response.data.data;
		} else {
			console.error(response.data.message);
			alert(response.data.message);
		}
	} catch (err) {
		console.error(err);
		alert("Something went wrong when getting an outfits items");
	}
};

export const createOutfit = async (dateWorn, description, items, imageFile) => {
	try {
		const { success, data, message } = await workerPool.processImage(
			imageFile
		);
		if (!success) {
			throw new Error(message);
		}

		const formData = new FormData();
		formData.append("image", data);
		formData.append("dateWorn", dateWorn);
		formData.append("description", description);
		formData.append("items", items);

		const response = await ax.post("/outfit", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		if (response.data.success === true) {
			console.log(response.data.message);
			return response.data.data;
		} else {
			console.error(response.data.message);
			alert(response.data.message);
		}
	} catch (err) {
		console.error(err);
		alert("Something went wrong when creating an outfit");
	}
};

export const deleteOutfit = async (outfitId) => {
	try {
		const response = await ax.delete(`/outfit/${outfitId}`);
		if (response.data.success === true) {
			console.log(response.data.message);
		} else {
			console.error(response.data.message);
			alert(response.data.message);
		}
	} catch (err) {
		console.error(err);
		alert("Something went wrong when deleting an outfit");
	}
};

export const addItemsToOutfit = async (outfitId, items) => {
	try {
		const response = await ax.post(`/outfit/${outfitId}/items`, {
			items: items,
		});

		if (response.data.success === true) {
			console.log(response.data.message);
		} else {
			console.error(response.data.message);
			alert(response.data.message);
		}
	} catch (err) {
		console.error(err);
		alert("Something went wrong when adding items to an outfit");
	}
};

export const removeItemsFromOutfit = async (outfitId, items) => {
	try {
		const response = await ax.delete(`/outfit/${outfitId}/items`, {
			data: { items: items },
		});

		if (response.data.success === true) {
			console.log(response.data.message);
		} else {
			console.error(response.data.message);
			alert(response.data.message);
		}
	} catch (err) {
		console.error(err);
		alert("Something went wrong when removing items from an outfit");
	}
};
