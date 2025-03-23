import React from "react";
import { useDispatch } from "react-redux";
import { setItems } from "../../store/reducers/itemsReducer";
import { filterItemsByCategories } from "../../api/Item";
import CategoriesCheckboxForm from "./CategoriesCheckboxForm";

const FilterItemsForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = async (selectedCategories) => {
		const filteredItems = await filterItemsByCategories(selectedCategories);
		dispatch(setItems(filteredItems));
	};

	return <CategoriesCheckboxForm handleSubmit={handleSubmit} />;
};

export default FilterItemsForm;
