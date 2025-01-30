import React from "react";

import "../styles/CheckboxButton.css"

const CheckboxButton = ({ text, buttonId, onChange }) => {
    return (
        <>
            <label className="checkbox-button" htmlFor={buttonId}>
                <input type="checkbox" id={buttonId} onChange={onChange}/>
                <span>{text}</span>
            </label>
        </>
    );
};

export default CheckboxButton;