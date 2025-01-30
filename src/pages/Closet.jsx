import React from "react";

import CategoriesButtonList from "../components/CategoriesButtonList";
import FilterItemsForm from "../components/FilterItemsForm";
import AddCategoryForm from "../components/AddCategoryForm";
import AddItemForm from "../components/AddItemForm";
import AllItemDisplay from "../components/AllItemDisplay";

import "../styles/Closet.css";

const Closet = () => {
    return (
        <div className="closetPage">
            <AddCategoryForm />
            <br />
            <AddItemForm />
            <br />
            <AllItemDisplay />
            <br />
            <br />
            <br />
            <FilterItemsForm />
        </div>
    );
};

export default Closet;