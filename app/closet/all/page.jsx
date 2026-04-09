"use client";

import { useEffect } from "react";
import AllItemsView from "../../../src/views/AllItemsView";

export default function AllItemsPage() {
	useEffect(() => {
		document.title = "All Items | Your Fashion Fits";
	}, []);

	return <AllItemsView />;
}
