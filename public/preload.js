/* eslint-disable @typescript-eslint/no-var-requires */
const { contextBridge, ipcRenderer } = require("electron");
const { takeScreenshot } = require("../src/media-api/fullsnip");
const { VideoRecorder } = require("../src/media-api/video-recorder");

const videoRecorder = new VideoRecorder();

contextBridge.exposeInMainWorld("appRuntime", {
    send: (channel, command, args) => {
        ipcRenderer.send(channel, command, args);
    },
    subscribe: (channel, listener) => {
        const subscription = (event, ...args) => listener(...args);
        ipcRenderer.on(channel, subscription);

        return () => {
            ipcRenderer.removeListener(channel, subscription);
        };
    },
    subscribeOnce: (channel, listener) => {
        const subscription = (event, ...args) => listener(...args);
        ipcRenderer.once(channel, subscription);
    },
    handleFullsnip: (userPath, thumbSize) => {
        takeScreenshot(userPath, thumbSize);
    },
    handleVideo: (videoState, userPath) => {
        if (videoState === false) {
            videoRecorder.start();
        } else {
            videoRecorder.stop(userPath);
        }
    },
});
