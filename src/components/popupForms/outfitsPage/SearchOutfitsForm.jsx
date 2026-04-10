"use client";

import React, { useState } from "react";
import styles from "./SearchOutfitsForm.module.css";
import { searchOutfits, getAllOutfits } from "@/api/actions/outfit";

const SearchOutfitsForm = ({ setDisplayedOutfits }) => {
	const [query, setQuery] = useState("");

	const handleSearch = () => {
		if (query.trim() === "") {
			getAllOutfits()
				.then((allOutfits) => {
					setDisplayedOutfits(allOutfits);
				})
				.catch((err) => console.log(err));
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
