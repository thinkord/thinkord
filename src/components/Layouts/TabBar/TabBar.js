import React, { useContext } from "react";
import Tab from "./Tab/Tab";
import { NavLink } from "react-router-dom";
import { TabsContext } from "../../../tabContext";
import classes from "./TabBar.module.scss";
import appRuntime from "../../../appRuntime";

const TabBar = () => {
    const tabsList = useContext(TabsContext).tabs;
    return (
        <div className={classes.TabBar}>
            <NavLink
                to="/"
                exact
                className={classes.HomeBtn}
                activeClassName={classes.active}
                onClick={() => {
                    appRuntime.send("windprocess", "close");
                }}
            >
                <i className="fas fa-home"></i>
            </NavLink>
            {tabsList.map((tab) => {
                return <Tab key={tab.id} id={tab.id} cId={tab.collectionId} title={tab.title} />;
            })}
        </div>
    );
};

export default TabBar;
