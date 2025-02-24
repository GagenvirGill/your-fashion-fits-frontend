import React, { useState, useEffect } from "react";
import { filterItemsByCategories } from "../../../api/Item";
import { useItems } from "../../../context/ItemContext";
import CategoriesButtonList from "../../buttons/CategoriesButtonList";
import Button from "../../buttons/Button";
import styles from "../../../styles/FilterItemsForm.module.css"

const FilterItemsForm = () => {
	const { setFilteredItems } = useItems();
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
        const filteredItems = await filterItemsByCategories(selectedCategories);
        setLoading(false);
		setFilteredItems(filteredItems);
    };

    return (
        <form className={styles.filterItemsForm} onSubmit={handleSubmit}>
            <CategoriesButtonList onCheckboxChange={handleCheckboxChange} />
            <br />
            <Button type={"submit"} text={"Submit"} disabled={loading}/>
        </form>
    );
};

export default FilterItemsForm;
