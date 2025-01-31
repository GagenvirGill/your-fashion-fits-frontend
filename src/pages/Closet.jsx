import React from "react";

import FilterItemsForm from "../components/FilterItemsForm";
import AllItemDisplay from "../components/AllItemDisplay";
import AddCategoryForm from "../components/AddCategoryForm";
import AddItemForm from "../components/AddItemForm";

import "../styles/Closet.css";

const Closet = () => {
    return (
        <div className="closetPage">
            <FilterItemsForm />
            <br />
            <p>???</p>
            <AddCategoryForm />
            <p>???</p>
            <AddItemForm />
            <p>???</p>
            <AllItemDisplay />
        </div>
    );
};

export default Closet;