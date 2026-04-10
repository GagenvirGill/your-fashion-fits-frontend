"use client";

import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { outfitsAtom } from "@/jotai/outfitsAtom";
import styles from "./SearchOutfitsForm.module.css";
import { searchOutfits } from "@/api/actions/outfit";

const SearchOutfitsForm = ({ setDisplayedOutfits }) => {
	const outfits = useAtomValue(outfitsAtom);
	const [query, setQuery] = useState("");

	const handleSearch = () => {
		if (query.trim() === "") {
			setDisplayedOutfits(outfits);
		} else {
			searchOutfits(query)
				.then((queriedOutfits) => {
					setDisplayedOutfits(queriedOutfits);
				})
				.catch((err) => console.log(err));
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<input
			type="text"
			id="search-query"
			className={styles.textInput}
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			onKeyDown={handleKeyDown}
			placeholder="Search outfits by description"
		/>
	);
};

export default SearchOutfitsForm;
