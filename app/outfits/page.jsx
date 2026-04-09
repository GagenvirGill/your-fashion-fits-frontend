"use client";

import { useEffect } from "react";
import OutfitsView from "../../src/views/OutfitsView";

export default function OutfitsPage() {
	useEffect(() => {
		document.title = "Your Outfits | Your Fashion Fits";
	}, []);

	return <OutfitsView />;
}
