import React from "react";

import ClosetSidePanel from "./closetSidePanel/ClosetSidePanel";
import ImgButton from "../buttons/ImgButton";

import styles from "./CollapsibleSidePanel.module.css";

const CollapsibleSidePanel = ({ isCollapsed, togglePanel}) => {
	return (
		<>
			{!isCollapsed && <ClosetSidePanel />}
			<ImgButton buttonId="collapsibleSidePanelCloset" imgFileName="/dropdown_icon.png" onChange={togglePanel}/>
		</>
	);
};

export default CollapsibleSidePanel;
