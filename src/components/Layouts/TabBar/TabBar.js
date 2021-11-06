/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from "react";
import Tab from "./Tab/Tab";
import { NavLink } from "react-router-dom";
import { TabsContext } from "../../../context/tabContext";
import classes from "./TabBar.module.scss";
import appRuntime from "../../../appRuntime";

const TabBar = () => {
    let { tabs, loadTab } = useContext(TabsContext);
    useEffect(() => {
        // listen loadTab events when needs to reload tabs from the localStorage
        appRuntime.subscribe("loadTab", (data) => {
            let currentTabs = localStorage.getItem("current_tabs");
            if (tabs.length < 1 && currentTabs != null && currentTabs.length > 0) {
                loadTab();
                tabs = JSON.parse(currentTabs);
                return;
            }
            if (data.fromEvent === "delete_folders") {
                loadTab();
            }
        });
    }, []);
    return (
        <div className={classes.TabBar}>
            <NavLink
                to="/"
                exact
                className={classes.HomeBtn}
                activeClassName={classes.active}
                onClick={() => {
                    appRuntime.invoke("window-channel", "close", { win: "controlWin" });
                    appRuntime.unsubscribe("capture");
                    appRuntime.unsubscribe("system-channel");
                }}
            >
                <i className="fas fa-home"></i>
            </NavLink>
            {tabs.map((tab) => {
                return <Tab key={tab.id} tabId={tab.id} id={tab.collectionId} title={tab.title} />;
            })}
        </div>
    );
};

export default TabBar;
