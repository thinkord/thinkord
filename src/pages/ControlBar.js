import React, { useState } from "react";
import appRuntime from "../appRuntime";

export default function ControlBar() {
    const [audioState, setAudioState] = useState(false);
    const [videoState, setVideoState] = useState(false);

    const handleFullsnip = () => {
        // Refactor later
        appRuntime.send("system-channel", "getUserPath");
        appRuntime.subscribeOnce("system-channel", (path) => {
            appRuntime.send("system-channel", "getScreenshotSize");
            appRuntime.subscribeOnce("system-channel", (screenshotSize) => {
                appRuntime.handleFullsnip(path, screenshotSize);
            });
        });
    };

    const handleAudio = () => {
        if (audioState === false) {
            appRuntime.handleAudio(audioState);
        } else {
            appRuntime.send("system-channel", "getUserPath");
            appRuntime.subscribeOnce("system-channel", (path) => {
                appRuntime.handleAudio(audioState, path);
            });
        }
        setAudioState((prevState) => !prevState);
    };

    const handleVideo = () => {
        if (videoState === false) {
            appRuntime.handleVideo(videoState);
        } else {
            appRuntime.send("system-channel", "getUserPath");
            appRuntime.subscribeOnce("system-channel", (path) => {
                appRuntime.handleVideo(videoState, path);
            });
        }
        setVideoState((prevState) => !prevState);
    };

    return (
        <div>
            <button id="textButton">text</button>
            <button
                id="fullsnipButton"
                onClick={() => {
                    handleFullsnip();
                }}
            >
                fullsnip
            </button>
            <button id="dragsnipButton">dragsnip</button>
            <button
                id="audioButton"
                onClick={() => {
                    handleAudio();
                }}
            >
                audio
            </button>
            <button
                id="videoButton"
                onClick={() => {
                    handleVideo();
                }}
            >
                video
            </button>
            <button id="homeButton">home</button>
        </div>
    );
}
