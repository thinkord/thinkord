/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState, useContext } from "react";
import { ControlContext } from "../context/controlContext";
import appRuntime from "../appRuntime";

export default function ControlBar() {
    const { mapCId } = useContext(ControlContext);
    const [currentCId, setCurrentCId] = useState(mapCId);
    const [path, setPath] = useState("");
    const [audioState, setAudioState] = useState(false);
    const [videoState, setVideoState] = useState(false);
    useEffect(() => {
        appRuntime.subscribe("changed", (data) => {
            setCurrentCId(data);
        });

        async function getPath() {
            const path = await appRuntime.invoke("system-channel", "getUserPath");
            setPath(path);
        }
        getPath();
        // appRuntime.registerAllShortcuts();

        // // Listen to globalShortcut
        // appRuntime.subscribe("system-channel", (command) => {
        //     switch (command) {
        //         case "fullsnip":
        //             handleFullsnip();
        //             break;
        //         case "dragsnip":
        //             handleDragsnip();
        //             break;
        //         case "record-audio":
        //             handleAudio();
        //             break;
        //         case "record-video":
        //             handleVideo();
        //             break;
        //         default:
        //             break;
        //     }
        // });

        // return function cleanup() {
        //     appRuntime.invoke("system-channel", "unregisterAllShortcuts");
        // };
    }, [currentCId]);

    const handleFullsnip = async () => {
        const screenshotSize = await appRuntime.invoke("system-channel", "getScreenshotSize");
        const currentWork = currentCId === undefined ? mapCId : currentCId;
        appRuntime.handleFullsnip(path, screenshotSize, currentWork);
    };

    const handleDragsnip = () => {
        const currentWork = currentCId === undefined ? mapCId : currentCId;
        appRuntime.handleDragsnip(currentWork);
    };

    const handleAudio = async () => {
        if (audioState === false) {
            appRuntime.handleAudio(audioState);
        } else {
            const currentWork = currentCId === undefined ? mapCId : currentCId;
            appRuntime.handleAudio(audioState, path, currentWork);
        }
        setAudioState((prevState) => !prevState);
    };

    const handleVideo = async () => {
        if (videoState === false) {
            appRuntime.handleVideo(videoState);
        } else {
            const currentWork = currentCId === undefined ? mapCId : currentCId;
            appRuntime.handleVideo(videoState, path, currentWork);
        }
        setVideoState((prevState) => !prevState);
    };

    // const mapCurrent = () => {
    //     const currentWork = currentCId === undefined ? mapCId : currentCId;
    //     appRuntime.setCurrentCollection(currentWork);
    // }

    return (
        <div>
            <h1> map: {currentCId === undefined ? mapCId : currentCId}</h1>
            {/* {mapCurrent()} */}
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
