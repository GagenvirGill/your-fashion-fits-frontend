import ax from "./axiosConfig";

export const getAllOutfits = async () => {
	try {
		const response = await ax.get("/outfit", { withCredentials: true });
		if (response.data.success === true) {
			return response.data.data;
		} else {
			console.error(response.data.message);
		}
	} catch (err) {
		console.error(err);
	}
};

export const createOutfit = async (dateWorn, description, items) => {
	try {
		const response = await ax.post(
			"/outfit",
			{
				dateWorn: dateWorn,
				description: description,
				items: items,
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

export const deleteOutfit = async (outfitId) => {
	try {
		const response = await ax.delete(`/outfit/${outfitId}`, {
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

export const searchOutfits = async (query) => {
	try {
		const response = await ax.get("/outfit/search", {
			params: {
				query: query,
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
