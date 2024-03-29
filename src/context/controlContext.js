/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import appRuntime from "../appRuntime";
import log from "loglevel";

const ControlContext = React.createContext({
    mapCId: "",
    path: "",
    audioState: false,
    videoState: false,
    textState: false,
});

class ControlProvider extends Component {
    async componentDidMount() {
        const data = await appRuntime.invoke("home-channel", "getCID");
        const path = await appRuntime.invoke("system-channel", "getUserPath");

        this.setState({
            mapCId: data,
            path,
            textState: false,
            audioState: false,
            videoState: false,
        });
        appRuntime.registerAllShortcuts();
        appRuntime.subscribe("changed", (data) => {
            this.setState({ mapCId: data });
            appRuntime.unsubscribe("system-channel");
            this.subscribeShortcut();
        });
        this.subscribeShortcut();
    }

    subscribeShortcut = () => {
        // Listen to globalShortcut
        appRuntime.subscribe("system-channel", async (command) => {
            switch (command) {
                case "text":
                    this.handleShortcutText();
                    break;
                case "fullsnip":
                    this.handleFullsnip();
                    break;
                case "dragsnip":
                    this.handleDragsnip();
                    break;
                case "record-audio":
                    this.handleAudio();
                    break;
                case "record-video":
                    this.handleVideo();
                    break;
                default:
                    break;
            }
        });
    };

    /** should notice the text state, otherwise back to the control bar
     * the textState is not correspond to the handleText
     */
    handleShortcutText = () => {
        const { textState } = this.state;
        if (!textState) {
            this.handleTextState();
            appRuntime.invoke("window-channel", "load", { win: "controlWin", page: "text" });
        }
    };

    handleText = (text) => {
        const { textState, mapCId } = this.state;
        if (textState === false) {
            appRuntime.invoke("window-channel", "load", { win: "controlWin", page: "text" });
        } else {
            appRuntime.invoke("media-channel", "save", { type: "text", text: text, current: mapCId });
            appRuntime.invoke("window-channel", "captureSignal", "data");
        }

        this.handleTextState();
    };

    handleTextState = () => {
        const { textState } = this.state;
        this.setState({ textState: !textState });
    };

    handleFullsnip = async () => {
        const screenshotSize = await appRuntime.invoke("system-channel", "getScreenshotSize");
        appRuntime.handleFullsnip(this.state.path, screenshotSize, this.state.mapCId);
    };

    handleDragsnip = () => {
        appRuntime.handleDragsnip(this.state.mapCId);
    };

    handleAudio = async () => {
        const { audioState, videoState, path, mapCId } = this.state;
        if (audioState === false && videoState === false) {
            appRuntime.handleAudio(audioState);
            this.setState({ audioState: !audioState });
        } else if (audioState === true && videoState === false) {
            appRuntime.handleAudio(audioState, path, mapCId);
            this.setState({ audioState: !audioState });
        }
        log.error("Something wrong with audio function");
    };

    handleVideo = async () => {
        const { audioState, videoState, path, mapCId } = this.state;
        if (videoState === false && audioState === false) {
            appRuntime.handleVideo(videoState);
            this.setState({ videoState: !videoState });
        } else if (videoState === true && audioState === false) {
            appRuntime.handleVideo(videoState, path, mapCId);
            this.setState({ videoState: !videoState });
        }
        log.error("Something wrong with video function");
    };

    render() {
        return (
            <ControlContext.Provider
                value={{
                    ...this.state,
                    handleText: this.handleText,
                    handleTextState: this.handleTextState,
                    handleFullsnip: this.handleFullsnip,
                    handleDragsnip: this.handleDragsnip,
                    handleAudio: this.handleAudio,
                    handleVideo: this.handleVideo,
                }}
            >
                {this.props.children}
            </ControlContext.Provider>
        );
    }
}

export { ControlContext, ControlProvider };
