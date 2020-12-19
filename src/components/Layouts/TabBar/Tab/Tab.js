/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { TabsContext } from "../../../../context/tabContext";
import classes from "./Tab.module.scss";
import appRuntime from "../../../../appRuntime";
const Tab = ({ location, history, id, tabId, title }) => {
    const closeTab = useContext(TabsContext).closeTab;
    const [closed, setClosed] = useState(false);
    const handleTabClosed = (e) => {
        e.preventDefault();
        setClosed(true);
    };

    useEffect(() => {
        if (closed === true) {
            closeTab(tabId);
            if (location.pathname === "/work/" + id) {
                history.replace("/");
            }
        }
    });

    return (
        <NavLink
            to={`/work/${id}`}
            className={classes.Tab}
            activeClassName={classes.active}
            onClick={() => {
                console.log(id);
                appRuntime.send("window-channel", "create", { id });
            }}
        >
            <div className={classes.TabTitle}>
                <i className="fas fa-file" style={{ fontSize: "14px" }}></i>
                <p>{title}</p>
            </div>
            <div className={classes.TabClose} onClick={handleTabClosed}>
                <i className="fas fa-times" style={{ fontSize: "14px" }}></i>
            </div>
        </NavLink>
    );
};

export default withRouter(Tab);
