import React, { useState } from "react";

import ItemCardDisplay from "../components/closetPage/ItemCardDisplay";
import CollapsibleSidePanel from "../components/closetPage/CollapsibleSidePanel";

import styles from "../styles/Closet.module.css";

const Closet = () => {
	const [isCollapsed, setIsCollapsed] = useState(true);

	const togglePanel = () => {
		setIsCollapsed(!isCollapsed);
	};

    return (
        <div className={styles.closetPage}>
            <br />
			<CollapsibleSidePanel isCollapsed={isCollapsed} togglePanel={togglePanel}/>
			<ItemCardDisplay isSidePanelCollapsed={isCollapsed}/>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
        </div>
    );
};

export default Closet;