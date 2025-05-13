import ax from "./axiosConfig";
import { processImage } from "../util/Image";

export const getAllItems = async () => {
	try {
		const response = await ax.get("/item", { withCredentials: true });
		if (response.data.success === true) {
			return response.data.data;
		} else {
			console.error(response.data.message);
		}
	} catch (err) {
		console.error(err);
	}
};

export const createItem = async (imageFile) => {
	try {
		const file = await processImage(imageFile);
		if (file === undefined) {
			throw new Error("Error Processsing Image");
		}

		const formData = new FormData();
		formData.append("image", file);

		const response = await ax.post("/item", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			withCredentials: true,
		});

		if (response.data.success === false) {
			console.error(response.data.message);
		}

		return response.data.success;
	} catch (err) {
		console.error(err);
	}
};

export const deleteItem = async (itemId) => {
	try {
		const response = await ax.delete(`/item/${itemId}`, {
			withCredentials: true,
		});

		if (response.data.success === false) {
			console.error(response.data.message);
		}

		return response.data.success;
	} catch (err) {
		console.error(err);
	}
};

export const getCategoriesForItem = async (itemId) => {
	try {
		const response = await ax.get(`/item/${itemId}/categories`, {
			withCredentials: true,
		});
		if (response.data.success === true) {
			return response.data.data;
		} else {
			console.error(response.data.message);
		}
	} catch (err) {
		console.error(err);
	}
};

export const filterItemsByCategories = async (categories) => {
	try {
		const response = await ax.get("/item", {
			params: {
				categories: categories,
			},
			withCredentials: true,
		});

		if (response.data.success === true) {
			return response.data.data;
		} else {
			console.error(response.data.message);
		}
	} catch (err) {
		console.error(err);
	}
};

export const addItemToCategories = async (itemId, categories) => {
	try {
		const response = await ax.post(
			`/item/${itemId}/categories`,
			{
				categories: categories,
			},
			{ withCredentials: true }
		);

		if (response.data.success === false) {
			console.error(response.data.message);
		}

		return response.data.success;
	} catch (err) {
		console.error(err);
	}
};

export const removeItemFromCategories = async (itemId, categories) => {
	try {
		const response = await ax.delete(`/item/${itemId}/categories`, {
			data: { categories: categories },
			withCredentials: true,
		});

		if (response.data.success === false) {
			console.error(response.data.message);
		}

		return response.data.success;
	} catch (err) {
		console.error(err);
	}
};

export const getRandomItemWithCategories = async (categories) => {
	try {
		const response = await ax.get("/item/random", {
			params: {
				categories: categories,
			},
			withCredentials: true,
		});

		if (response.data.success === true) {
			return response.data.data;
		} else {
			console.error(response.data.message);
		}
	} catch (err) {
		console.error(err);
	}
};
