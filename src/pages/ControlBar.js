/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import appRuntime from "../appRuntime";

export default function ControlBar() {
    appRuntime.subscribe("bindControl", (data) => {
        // console.log("collectionId front: ", data);
    });
    return (
        <div>
            <button
                onClick={() => {
                    appRuntime.send("test-channel", "test", "haha");
                }}
            >
                video
            </button>
        </div>
    );
}
