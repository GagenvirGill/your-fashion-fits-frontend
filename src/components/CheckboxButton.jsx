import React from "react";

const CheckboxButton = ({ text, buttonId }) => {
    return (
        <>
            <input type="checkbox" id={buttonId} />
            <label htmlFor={buttonId}>{text}</label>
            <br />
        </>
    );
};

export default CheckboxButton;