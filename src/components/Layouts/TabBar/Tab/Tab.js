/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { TabsContext } from "../../../../tabContext";
import classes from "./Tab.module.scss";
import appRuntime from "../../../../appRuntime";
const Tab = (props) => {
    const closeTab = useContext(TabsContext).closeTab;
    const [closed, setClosed] = useState(false);
    const handleTabClosed = (e) => {
        e.preventDefault();
        setClosed(true);
    };

    useEffect(() => {
        if (closed === true) {
            closeTab(props.id);
            if (props.location.pathname === "/work/" + props.cId) {
                props.history.replace("/");
            }
        }
    });

    return (
        <NavLink
            to={`/work/${props.cId}`}
            className={classes.Tab}
            activeClassName={classes.active}
            onClick={() => {
                appRuntime.send("windprocess", "create");
            }}
        >
            <div className={classes.TabTitle}>
                <i className="fas fa-file" style={{ fontSize: "14px" }}></i>
                <p>{props.title}</p>
            </div>
            <div className={classes.TabClose} onClick={handleTabClosed}>
                <i className="fas fa-times" style={{ fontSize: "14px" }}></i>
            </div>
        </NavLink>
    );
};

export default withRouter(Tab);
