import React, { useState, useEffect } from "react";

import styles from "../styles/Button.module.css"

const Button = ({ type, text, disable, onClick}) => {
    return (
        <button className={styles.customButton} disabled={disable} type={type} onClick={onClick}>{text}</button>
    );
};

export default Button
