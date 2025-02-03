import React from "react";
import styles from "../../styles/ImgButton.module.css"

const ImgButton = ({ buttonId, imgFileName, onClick }) => {
    return (
        <label className={styles.imgBtn} htmlFor={buttonId}>
            <input type="button" id={buttonId} onClick={onClick}/>
            <img src={imgFileName} alt={buttonId} className={styles.imgIcon}></img>
        </label>
    );
};

export default ImgButton;