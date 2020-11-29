import React from "react";
import classes from "./Layouts.module.scss";
import WindowTitleBar from "./WindowTitlebar/WindowTitlebar";
import TabBar from "./TabBar/TabBar";

const Layout = (props) => {
    return (
        <React.Fragment>
            <WindowTitleBar docTitle="Home" />
            <TabBar />
            <main className={classes.Content}>{props.children}</main>
        </React.Fragment>
    );
};

export default Layout;
