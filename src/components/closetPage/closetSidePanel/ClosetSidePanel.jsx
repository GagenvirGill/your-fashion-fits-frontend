import React, { useState } from "react";
import FilterItemsForm from "./FilterItemsForm"
import AddCategoryForm from "./AddCategoryForm";
import AddItemForm from "./AddItemForm";
import ClosetSidePanelRadioForm from "./ClosetSidePanelRadioForm";
import styles from "../../../styles/ClosetSidePanel.module.css";

const ClosetSidePanel = () => {
    const [selectedOption, setSelectedOption] = useState("filter");

    const renderComponent = (selectedOption) => {
        if (selectedOption === "filter") {
            return <FilterItemsForm />
        } else if (selectedOption === "addItem") {
            return <AddItemForm />
        } else if (selectedOption === "addCategory") {
            return <AddCategoryForm />
        }
    };

    return (
        <div className={styles.dropdownPanel}>
			<br />
            <ClosetSidePanelRadioForm 
                renderComponent={renderComponent} 
                selectedOption={selectedOption} 
                setSelectedOption={setSelectedOption} 
            />
            {renderComponent(selectedOption)}
        </div>
    );
};


export default ClosetSidePanel;