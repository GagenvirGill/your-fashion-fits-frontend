"use client";

import { useEffect } from "react";
import Closet from "../../src/views/Closet";

export default function ClosetPage() {
	useEffect(() => {
		document.title = "Your Closet | Your Fashion Fits";
	}, []);

	return <Closet />;
}
