import React, { useState, useEffect } from "react";

import { getAllCategories } from "../api/Category";
import CheckboxButton from "./CheckboxButton";

const CategoriesButtonList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then(setCategories);
    }, []);

    return (
        <>
            {categories.map(category => <CheckboxButton text={category.name} id={category.categoryId} key={category.categoryId} />)}
        </>
    );    
};

export default CategoriesButtonList;
