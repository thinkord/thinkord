/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { Icon } from "@material-ui/core";
import classes from "./InsertToolBar.module.scss";

const InsertToolBar = (props) => {
    return (
        <div className={classes.Toolbar}>
            <svg id="record-btn" xmlns="http://www.w3.org/2000/svg" width="35.378" height="35.378">
                <g stroke="#35c189" strokeWidth="5" fill="none">
                    <circle cx="17.689" cy="17.689" r="17.689" stroke="none" />
                    <circle cx="17.689" cy="17.689" r="15.189" />
                </g>
                <circle cx="11.371" cy="11.371" r="11.371" transform="translate(6.317 6.317)" fill="#35c189" />
            </svg>
            <span className={classes.Separator}></span>
            <Icon className={classes.Icon + " fas fa-image"} />
            <Icon className={classes.Icon + " fas fa-film"} />
            <Icon className={classes.Icon + " fas fa-microphone-alt"} />
            <Icon className={classes.Icon + " fas fa-quote-right"} />
        </div>
    );
};

export default InsertToolBar;
