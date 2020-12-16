import React, { useState } from "react";
import appRuntime from "../appRuntime";
// import { VideoRecorder } from "../media-api/video-recorder";

export default function ControlBar() {
    // const [videoState, setVideoState] = useState(false);

    const handleFullsnip = () => {
        // Refactor later
        appRuntime.send("system-channel", "getUserPath");
        appRuntime.subscribeOnce("system-channel", (userPath) => {
            appRuntime.send("system-channel", "getScreenshotSize");
            appRuntime.subscribeOnce("system-channel", (screenshotSize) => {
                appRuntime.fullsnip(userPath, screenshotSize);
            });
        });
    };

    // const handleVideo = () => {
    //     setVideoState((prevState) => !prevState);
    // };

    return (
        <div>
            <button id="textButton">text</button>
            <button id="dragsnipButton">dragsnip</button>
            <button
                id="fullsnipButton"
                onClick={() => {
                    handleFullsnip();
                }}
            >
                fullsnip
            </button>
            <button id="audioButton">audio</button>
            <button id="videoButton">video</button>
            <button id="homeButton">home</button>
        </div>
    );
}
