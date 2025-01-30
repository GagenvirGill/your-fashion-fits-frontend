import React, { useState, useEffect } from "react";

import { filterItemsByCategories } from "../api/Item";
import CategoriesButtonList from "./CategoriesButtonList";
import "../styles/FilterItemsForm.css"

const FilterItemsForm = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCheckboxChange = (categoryId, checked) => {
        setSelectedCategories((prevState) => {
            if (checked) {
                return [...prevState, categoryId];
            } else {
                return prevState.filter(idVal => idVal !== categoryId);
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        await filterItemsByCategories(selectedCategories);
        setLoading(false);
    };

    return (
        <form className="filter-items-form" onSubmit={handleSubmit}>
            <CategoriesButtonList onCheckboxChange={handleCheckboxChange} />
            <button type="submit">Submit</button>
        </form>
    );// create a custom button for submit that looks like checkbox button but is an actual button
};

export default FilterItemsForm;
