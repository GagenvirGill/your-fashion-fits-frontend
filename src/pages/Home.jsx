import React from "react";
import HomeSidePanel from "../components/HomeSidePanel";
import HomeMainPanel from "../components/HomeMainPanel";

import "../styles/Home.css";

const Home = () => {
    return (
        <div className="homePage">
            <HomeSidePanel />
            <HomeMainPanel />
        </div>
    );
};

export default Home;
