import React, { useContext } from "react";
import { ControlContext } from "../../../context/controlContext";
import IconButton from '@material-ui/core/IconButton';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CropIcon from '@material-ui/icons/Crop';
import CropFreeIcon from '@material-ui/icons/CropFree';
import MicIcon from '@material-ui/icons/Mic';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import HomeIcon from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';
import classes from '../ConrolBar.module.sass';

export default function Text() {
    const { handleText, handleFullsnip, handleDragsnip, handleAudio, handleVideo } = useContext(ControlContext);
    return (
        <div className={classes.Controls}>
            <IconButton
                disable
                id="textButton"
                onClick={() => {
                    handleText();
            }}>
                <TextFieldsIcon className={classes.Control}/>
            </IconButton>
            <IconButton
                id="fullsnipButton"
                onClick={() => {
                    handleFullsnip();
            }}>
                <CropFreeIcon className={classes.Control}/>
            </IconButton>
            <IconButton
                id="dragsnipButton"
                onClick={() => {
                    handleDragsnip();
            }}>
                <CropIcon className={classes.Control}
            />
            </IconButton>
            <IconButton
                id="audioButton"
                onClick={() => {
                    handleAudio();
            }}>
                <MicIcon className={classes.Control}/>
            </IconButton>
            <IconButton
                id="videoButton"
                onClick={() => {
                    handleVideo();
            }}>
                <FiberManualRecordIcon className={classes.Control}/>
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton id="homeButton">
                <HomeIcon className={classes.Control}/>
            </IconButton>
        </div>
    );
}
