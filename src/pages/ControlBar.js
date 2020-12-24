import React, { useEffect, useState } from "react";
import appRuntime from "../appRuntime";

export default function ControlBar() {
    const [audioState, setAudioState] = useState(false);
    const [videoState, setVideoState] = useState(false);

    useEffect(() => {
        appRuntime.registerAllShortcuts();

        // Listen to globalShortcut
        appRuntime.subscribe("system-channel", (command) => {
            switch (command) {
                case "fullsnip":
                    handleFullsnip();
                    break;
                case "dragsnip":
                    handleDragsnip();
                    break;
                case "record-audio":
                    handleAudio();
                    break;
                case "record-video":
                    handleVideo();
                    break;
                default:
                    break;
            }
        });

        return function cleanup() {
            appRuntime.invoke("system-channel", "unregisterAllShortcuts");
        };
    });

    const handleFullsnip = async () => {
        const path = await appRuntime.invoke("system-channel", "getUserPath");
        const screenshotSize = await appRuntime.invoke("system-channel", "getScreenshotSize");
        appRuntime.handleFullsnip(path, screenshotSize);
    };

    const handleDragsnip = () => {
        appRuntime.handleDragsnip();
    };

    const handleAudio = async () => {
        if (audioState === false) {
            appRuntime.handleAudio(audioState);
        } else {
            const path = await appRuntime.invoke("system-channel", "getUserPath");
            appRuntime.handleAudio(audioState, path);
        }
        setAudioState((prevState) => !prevState);
    };

    const handleVideo = async () => {
        if (videoState === false) {
            appRuntime.handleVideo(videoState);
        } else {
            const path = await appRuntime.invoke("system-channel", "getUserPath");
            appRuntime.handleVideo(videoState, path);
        }
        setVideoState((prevState) => !prevState);
    };

    return (
        <div>
            {/* <h1> map: {currentCId === undefined ? mapCId : currentCId}</h1> */}
            <button id="textButton">text</button>
            <button
                id="fullsnipButton"
                onClick={() => {
                    handleFullsnip();
                }}
            >
                fullsnip
            </button>
            <button
                id="dragsnipButton"
                onClick={() => {
                    handleDragsnip();
                }}
            >
                dragsnip
            </button>
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
