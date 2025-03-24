import ax from "./axiosConfig";

export const getAllCategories = async () => {
	try {
		const response = await ax.get("/category");
		if (response.data.success === true) {
			console.log(response.data.message);
			return response.data.data;
		} else {
			console.error(response.data.message);
			alert(response.data.message);
		}
	} catch (err) {
		console.error(err);
		alert("Something went wrong when getting categories");
	}
};

export const createCategory = async (name) => {
	try {
		const response = await ax.post("/category", {
			name: name,
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
		alert("Something went wrong when creating a category");
	}
};

export const deleteCategory = async (categoryId) => {
	try {
		const response = await ax.delete(`/category/${categoryId}`);
		if (response.data.success === true) {
			console.log(response.data.message);
		} else {
			console.error(response.data.message);
			alert(response.data.message);
		}
	} catch (err) {
		console.error(err);
		alert("Something went wrong when deleting a category");
	}
};

export const addCategoryToItems = async (categoryId, items) => {
	try {
		const response = await ax.post(`/category/${categoryId}/items`, {
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
		alert("Something went wrong when adding category to items");
	}
};

export const removeCategoryFromItems = async (categoryId, items) => {
	try {
		const response = await ax.delete(`/category/${categoryId}/items`, {
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
		alert("Something went wrong when removing category from items");
	}
};
