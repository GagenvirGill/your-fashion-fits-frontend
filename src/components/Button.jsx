import React, { useState, useEffect } from "react";

import "../styles/Button.css"

const Button = ({ type, text, disable }) => {
    return (
        <button className="custom-button" disabled={disable} type={type}>{text}</button>
    );
};

export default Button
