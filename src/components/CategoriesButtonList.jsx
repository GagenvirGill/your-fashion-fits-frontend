import React, { useState, useEffect } from "react";

import { getAllCategories } from "../api/Category";
import CheckboxButton from "./CheckboxButton";

const CategoriesButtonList = ({ onCheckboxChange}) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then(setCategories);
    }, []);

    const handleCheckboxChange = (categoryId, checked) => {
        onCheckboxChange(categoryId, checked);
    };

    return (
        <>
            {categories.map(category => (
                <CheckboxButton 
                    key={category.categoryId} 
                    text={category.name} 
                    id={category.categoryId} 
                    onChange={(event) => handleCheckboxChange(category.categoryId, event.target.checked)}
                />
            ))}
        </>
    );    
};

export default CategoriesButtonList;
