import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setItems } from "../../../store/reducers/itemsReducer";

import { filterItemsByCategories } from "../../../api/Item"

import CategoriesButtonList from "../../buttons/CategoriesButtonList";
import Button from "../../buttons/Button";
import styles from "./FilterItemsForm.module.css"

const FilterItemsForm = () => {
	const dispatch = useDispatch();
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
		dispatch(setItems(filteredItems));
        setLoading(false);
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
