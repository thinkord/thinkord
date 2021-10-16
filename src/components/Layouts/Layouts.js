/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import classes from "./Layouts.module.scss";
import WindowTitleBar from "./WindowTitlebar/WindowTitlebar";
import TabBar from "./TabBar/TabBar";
import appRuntime from "../../appRuntime";

const Layout = (props) => {
    useEffect(() => {
        appRuntime.invoke("window-channel", "loadTab", { needLoad: true });
    });
    return (
        <React.Fragment>
            <WindowTitleBar />
            <TabBar />
            <main className={classes.Content}>{props.children}</main>
        </React.Fragment>
    );
};

export default Layout;
