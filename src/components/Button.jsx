import React, { useState, useEffect } from "react";

import styles from "../styles/Button.module.css"

const Button = ({ type, text, disable, id }) => {
    return (
        <button className={styles.customButton} disabled={disable} type={type}>{text}</button>
    );
};

export default Button
