/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext } from "react";
import { ControlContext } from "../context/controlContext";

export default function ControlBar() {
    const { mapCId, handleFullsnip, handleDragsnip, handleAudio, handleVideo } = useContext(ControlContext);
    return (
        <div>
            <h1> map: {mapCId}</h1>
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
