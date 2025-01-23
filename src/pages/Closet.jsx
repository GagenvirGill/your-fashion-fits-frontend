import React from "react";
import ClosetSidePanel from "../components/ClosetSidePanel";
import ClosetMainPanel from "../components/ClosetMainPanel";

import "../styles/Closet.css";

const Closet = () => {
    return (
        <div className="closetPage">
            <ClosetSidePanel />
            <ClosetMainPanel />
        </div>
    );
};

export default Closet;