/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext } from "react";
import { StoreUpdateContext } from "../../context/homeContext";
import { ControlContext } from "../../context/controlContext";
import { HashRouter, Route, Switch } from "react-router-dom";
import classes from "./ConrolBar.module.sass";
import Controls from "./Controls/Controls";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import appRuntime from "../../appRuntime";

export default function ControlBar() {
    const { mapCId } = useContext(ControlContext);
    const { getCollection } = useContext(StoreUpdateContext);
    const mappedCollection = getCollection(mapCId);
    return (
        <div className={classes.ControlBar}>
            <div className={classes.TitleBar}>
                <div> Note: {mappedCollection ? mappedCollection.name : ""}</div>
                <div
                    className={classes.winControls}
                    onClick={() => {
                        appRuntime.invoke("window-channel", "jump", { path: "/" });
                        appRuntime.invoke("window-channel", "close", { win: "controlWin" });
                        appRuntime.unsubscribe("capture");
                        appRuntime.unsubscribe("system-channel");
                    }}
                >
                    <ClearOutlinedIcon className={classes.winControl} />
                </div>
            </div>
            <HashRouter>
                <Switch>
                    <Route exact path="/controlbar" component={Controls} />
                </Switch>
            </HashRouter>
        </div>
    );
}
