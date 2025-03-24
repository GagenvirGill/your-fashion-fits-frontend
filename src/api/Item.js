import ax from "./axiosConfig";
import { workerPool } from "../worker/WorkerPool";

export const getAllItems = async () => {
	try {
		const response = await ax.get("/item");
		if (response.data.success === true) {
			console.log(response.data.message);
			return response.data.data;
		} else {
			console.error(response.data.message);
			alert(response.data.message);
		}
	} catch (err) {
		console.error(err);
		alert("Something went wrong when getting items");
	}
};

export const createItem = async (imageFile) => {
	try {
		const { success, data, message } = await workerPool.processImage(
			imageFile
		);
		if (!success) {
			throw new Error(message);
		}

		const formData = new FormData();
		formData.append("image", data);

		const response = await ax.post("/item", formData, {
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
		alert(`Something went wrong when creating an item: ${err}`);
	}
};

export const deleteItem = async (itemId) => {
	try {
		const response = await ax.delete(`/item/${itemId}`);
		if (response.data.success === true) {
			console.log(response.data.message);
		} else {
			console.error(response.data.message);
			alert(response.data.message);
		}
	} catch (err) {
		console.error(err);
		alert("Something went wrong when deleting an item");
	}
};

export const getCategoriesForItem = async (itemId) => {
	try {
		const response = await ax.get(`/item/${itemId}/categories`);
		if (response.data.success === true) {
			console.log(response.data.message);
			return response.data.data;
		} else {
			console.error(response.data.message);
			alert(response.data.message);
		}
	} catch (err) {
		console.error(err);
		alert("Something went wrong when geting the categories for an item");
	}
};

export const filterItemsByCategories = async (categories) => {
	try {
		const response = await ax.get("/item", {
			params: {
				categories: categories,
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
		alert("Something went wrong when getting filtered items");
	}
};

export const addItemToCategories = async (itemId, categories) => {
	try {
		const response = await ax.post(`/item/${itemId}/categories`, {
			categories: categories,
		});

		if (response.data.success === true) {
			console.log(response.data.message);
		} else {
			console.error(response.data.message);
			alert(response.data.message);
		}
	} catch (err) {
		console.error(err);
		alert("Something went wrong when adding item to categories");
	}
};

export const removeItemFromCategories = async (itemId, categories) => {
	try {
		const response = await ax.delete(`/item/${itemId}/categories`, {
			categories: categories,
		});

		if (response.data.success === true) {
			console.log(response.data.message);
		} else {
			console.error(response.data.message);
			alert(response.data.message);
		}
	} catch (err) {
		console.error(err);
		alert("Something went wrong when removing item from categories");
	}
};
