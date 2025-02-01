import React from "react";

import styles from "../styles/CheckboxButton.module.css"

const CheckboxButton = ({ text, buttonId, onChange }) => {
    return (
        <>
            <label className={styles.checkboxButton} htmlFor={buttonId}>
                <input type="checkbox" id={buttonId} onChange={onChange}/>
                <span>{text}</span>
            </label>
        </>
    );
};

export default CheckboxButton;