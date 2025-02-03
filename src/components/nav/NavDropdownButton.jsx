import React, { useState } from "react";
import NavDropdown from "./navDropdownContents/NavDropdown";
import ImgButton from "../buttons/ImgButton";

const NavDropdownButton = ({ buttonId, imgFileName }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdown = () => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    return (
        <>  
            <ImgButton buttonId="dropdownButton" imgFileName="/dropdown_icon.png" onClick={handleDropdown}/>
            {isOpen && <NavDropdown />}
        </>
    );
};

export default NavDropdownButton;
