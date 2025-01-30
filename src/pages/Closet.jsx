import React from "react";

import FilterItemsForm from "../components/FilterItemsForm";
import AllItemDisplay from "../components/AllItemDisplay";

import "../styles/Closet.css";

const Closet = () => {
    return (
        <div className="closetPage">
            <FilterItemsForm />
            <br />
            <br />
            <br />
            <br />
            <br />
            <AllItemDisplay />
        </div>
    );
};

export default Closet;