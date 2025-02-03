import React from "react";

import ItemCardDisplay from "../components/closetPage/ItemCardDisplay";

import styles from "../styles/Closet.module.css";

const Closet = () => {
    return (
        <div className={styles.closetPage}>
            <br />
            <ItemCardDisplay />
        </div>
    );
};

export default Closet;