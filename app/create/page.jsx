"use client";

import { useEffect } from "react";
import CreateView from "../../src/views/CreateView";

export default function CreatePage() {
	useEffect(() => {
		document.title = "Create | Your Fashion Fits";
	}, []);

	return <CreateView />;
}
