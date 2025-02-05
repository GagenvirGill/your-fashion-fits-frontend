import React from "react";
import styles from "../../styles/ImgButton.module.css"

const ImgButton = ({ buttonId, imgFileName, onChange }) => {
    return (
        <label className={styles.imgBtn} htmlFor={buttonId}>
            <input type="checkbox" id={buttonId} onChange={onChange}/>
            <img src={imgFileName} alt={buttonId} className={styles.imgIcon}></img>
        </label>
    );
};

export default ImgButton;