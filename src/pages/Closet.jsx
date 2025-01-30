import React from "react";

import CategoriesButtonList from "../components/CategoriesButtonList";
import AddCategoryForm from "../components/AddCategoryForm";
import AddItemForm from "../components/AddItemForm";
import AllItemDisplay from "../components/AllItemDisplay";

import "../styles/Closet.css";

const Closet = () => {
    return (
        <div className="closetPage">
            <CategoriesButtonList />
            <br />
            <AddCategoryForm />
            <br />
            <AddItemForm />
            <br />
            <AllItemDisplay />
        </div>
    );
};

export default Closet;