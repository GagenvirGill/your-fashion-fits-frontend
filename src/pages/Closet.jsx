import React from "react";

import FilterItemsForm from "../components/FilterItemsForm";
import ItemCardDisplay from "../components/ItemCardDisplay";
import AddCategoryForm from "../components/AddCategoryForm";
import AddItemForm from "../components/AddItemForm";

import styles from "../styles/Closet.module.css";

const Closet = () => {
    return (
        <div className={styles.closetPage}>
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