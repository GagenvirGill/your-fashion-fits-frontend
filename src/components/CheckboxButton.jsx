import React from "react";

import "../styles/CheckboxButton.css"

const CheckboxButton = ({ text, buttonId }) => {
    return (
        <>
            <label className="checkbox-button" htmlFor={buttonId}>
                <input type="checkbox" id={buttonId} />
                <span>{text}</span>
            </label>
        </>
    );
};

export default CheckboxButton;