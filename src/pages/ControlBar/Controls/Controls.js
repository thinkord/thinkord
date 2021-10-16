import React, { useContext } from "react";
import { ControlContext } from "../../../context/controlContext";
import IconButton from "@material-ui/core/IconButton";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CropIcon from "@material-ui/icons/Crop";
import CropFreeIcon from "@material-ui/icons/CropFree";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideoIcon from "@material-ui/icons/VideocamRounded";
import VideoOffIcon from "@material-ui/icons/VideocamOffRounded";
import HomeIcon from "@material-ui/icons/Home";
import Divider from "@material-ui/core/Divider";
import classes from "../ConrolBar.module.sass";
import appRuntime from "../../../appRuntime";

export default function Text() {
    const { audioState, videoState } = useContext(ControlContext);
    const { handleText, handleFullsnip, handleDragsnip, handleAudio, handleVideo } = useContext(ControlContext);
    return (
        <div className={classes.Controls}>
            <IconButton
                disable
                id="textButton"
                onClick={() => {
                    handleText();
                }}
            >
                <TextFieldsIcon className={classes.Control} />
            </IconButton>
            <IconButton
                id="fullsnipButton"
                onClick={() => {
                    handleFullsnip();
                }}
            >
                <CropFreeIcon className={classes.Control} />
            </IconButton>
            <IconButton
                id="dragsnipButton"
                onClick={() => {
                    handleDragsnip();
                }}
            >
                <CropIcon className={classes.Control} />
            </IconButton>
            <IconButton
                id="audioButton"
                onClick={() => {
                    handleAudio();
                }}
            >
                {audioState === false ? (
                    <MicIcon className={classes.Control} />
                ) : (
                    <MicOffIcon className={classes.Control} />
                )}
            </IconButton>
            <IconButton
                id="videoButton"
                onClick={() => {
                    handleVideo();
                }}
            >
                {videoState === false ? (
                    <VideoIcon className={classes.Control} />
                ) : (
                    <VideoOffIcon className={classes.Control} />
                )}
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton
                id="homeButton"
                onClick={() => {
                    appRuntime.invoke("window-channel", "jump", { path: "/" });
                    appRuntime.invoke("window-channel", "close", { win: "controlWin" });
                    appRuntime.unsubscribe("capture");
                    appRuntime.unsubscribe("system-channel");
                }}
            >
                <HomeIcon className={classes.Control} />
            </IconButton>
        </div>
    );
}
