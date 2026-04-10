"use client";

import React from "react";
import styles from "./GenericPageStyles.module.css";

import CategoryCardDisplay from "../components/cardDisplay/CategoryCardDisplay";

const Closet = ({ categories, items }) => {
	return (
		<div className={styles.pageContainer}>
			<div className={styles.pageTitle}>Your Categories</div>
			<br />
			<CategoryCardDisplay categories={categories} items={items} />
		</div>
	);
};

export default Closet;
