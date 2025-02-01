import React from "react";

import FilterItemsForm from "../components/FilterItemsForm";
import ItemCardDisplay from "../components/ItemCardDisplay";
import AddCategoryForm from "../components/AddCategoryForm";
import AddItemForm from "../components/AddItemForm";

import "../styles/Closet.css";

const Closet = () => {
    return (
        <div className="closetPage">
            <FilterItemsForm />
            <br />
            <br />
            <br />
            <br />
            <ItemCardDisplay />
            <br />
            <p>???</p>
            <AddCategoryForm />
            <p>???</p>
            <AddItemForm />
        </div>
    );
};

export default Closet;