import React, { useState, useEffect } from "react";
import { filterItemsByCategories } from "../../../api/Item";
import CategoriesButtonList from "../../buttons/CategoriesButtonList";
import Button from "../../buttons/Button";
import styles from "../../../styles/FilterItemsForm.module.css"

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
        <form className={styles.filterItemsForm} onSubmit={handleSubmit}>
            <CategoriesButtonList onCheckboxChange={handleCheckboxChange} />
            <br />
            <Button type={"submit"} text={"Submit"} diabled={loading}/>
        </form>
    );
};

export default FilterItemsForm;
