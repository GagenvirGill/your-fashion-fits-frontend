import React from "react";
import RadioButton from "../../buttons/RadioButton";

const NavDropdownRadioForm = ({ renderComponent, selectedOption, setSelectedOption }) => {

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
        renderComponent(event.target.value);
    };

    return (
        <form>
            <RadioButton
                text="Filter Items by Category"
                buttonId="navDropdownFilter"
                value="filter"
                checked={selectedOption === "filter"}
                onChange={handleRadioChange}
            />
            <RadioButton
                text="Add new Items"
                buttonId="navDropdownAddItem"
                value="addItem"
                checked={selectedOption === "addItem"}
                onChange={handleRadioChange}
            />
            <RadioButton
                text="Add new Categories"
                buttonId="navDropdownAddCategory"
                value="addCategory"
                checked={selectedOption === "addCategory"}
                onChange={handleRadioChange}
            />
        </form>
    );
};

export default NavDropdownRadioForm;