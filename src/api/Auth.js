import ax from "./axiosConfig";

export const checkLoggedInStatus = async () => {
	try {
		const response = await ax.get("/auth/check", { withCredentials: true });
		return response.data.loggedIn;
	} catch (err) {
		console.error(err);
		alert("Something went wrong when getting items");
	}
};
