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

export const createCategory = async (name, description) => {
	try {
		const response = await ax.post("/category", {
			name: name,
			description: description,
		});
		if (response.data.success === true) {
			console.log(response.data.message);
			alert(response.data.message);
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
		const response = await ax.delete("/category", {
			params: {
				categoryId: categoryId,
			},
		});
		if (response.data.success === true) {
			console.log(response.data.message);
		} else {
			console.error(response.data.message);
		}
		alert(response.data.message);
	} catch (err) {
		console.error(err);
		alert("Something went wrong when deleting a category");
	}
};
