// src/context/ItemContext.jsx
import React, { createContext, useState, useContext } from "react";

const ItemContext = createContext();

export const useItems = () => {
	return useContext(ItemContext);
};

export const ItemProvider = ({ children }) => {
	const [filteredItems, setFilteredItems] = useState([]);

	return (
		<ItemContext.Provider value={{ filteredItems, setFilteredItems }}>
			{children}
		</ItemContext.Provider>
	);
};
