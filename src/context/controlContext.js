/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import appRuntime from "../appRuntime";

const ControlContext = React.createContext({
    mapCId: "",
    path: "",
    audioState: false,
    videoState: false,
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
                    appRuntime.invoke("window-channel", "load", { win: "controlWin", page: "text" });
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

    handleText = (text) => {
        const { textState, mapCId } = this.state;
        if (textState === false) {
            appRuntime.invoke("window-channel", "load", { win: "controlWin", page: "text" });
        } else {
            appRuntime.invoke("media-channel", "save", { type: "text", text: text, current: mapCId });
            appRuntime.invoke("window-channel", "load", { win: "controlWin", page: "control" });
        }

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
        const { audioState, path, mapCId } = this.state;
        if (audioState === false) {
            appRuntime.handleAudio(audioState);
        } else {
            appRuntime.handleAudio(audioState, path, mapCId);
        }
        this.setState({ audioState: !audioState });
    };

    handleVideo = async () => {
        const { videoState, path, mapCId } = this.state;
        if (videoState === false) {
            appRuntime.handleVideo(videoState);
        } else {
            appRuntime.handleVideo(videoState, path, mapCId);
        }
        this.setState({ videoState: !videoState });
    };

    render() {
        return (
            <ControlContext.Provider
                value={{
                    ...this.state,
                    handleText: this.handleText,
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
