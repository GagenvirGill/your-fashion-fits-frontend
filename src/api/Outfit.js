import ax from "./axiosConfig";

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

export const createOutfit = async (dateWorn, description, items) => {
	try {
		const response = await ax.post("/outfit", {
			dateWorn: dateWorn,
			description: description,
			items: items,
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
