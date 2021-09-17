/* eslint-disable @typescript-eslint/no-var-requires */
const { contextBridge, ipcRenderer } = require("electron");
const { takeScreenshot } = require("./media-api/fullsnip");
const { startDragsnip } = require("./media-api/dragsnip/capture-renderer");
const { AudioRecorder } = require("./media-api/audio-recorder");
const { VideoRecorder } = require("./media-api/video-recorder");

const audioRecorder = new AudioRecorder();
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
    unsubscribe: (channel) => {
        ipcRenderer.removeAllListeners(channel);
    },
    subscribeOnce: (channel, listener) => {
        const subscription = (event, ...args) => listener(...args);
        ipcRenderer.once(channel, subscription);
    },
    unsubscribe: (channel) => {
        ipcRenderer.removeAllListeners(channel);
    },
    invoke: async (channel, command, args) => {
        const result = await ipcRenderer.invoke(channel, command, args);
        return result;
    },
    handleFullsnip: (userPath, thumbSize, currentWork) => {
        takeScreenshot(userPath, thumbSize, currentWork);
    },
    handleDragsnip: async () => {
        await ipcRenderer.invoke("window-channel", "create", { win: "maskWin" });

        // ipcRenderer.removeAllListeners("dragsnip-saved");
        // ipcRenderer.once("dragsnip-saved", (event, dragsnipPath) => {
        //     // Add new block to the note object
        //     // let note = noteManager.addBlock(this.state.collection, { filePath: dragsnipPath });
        // });
    },
    handleDragsnipStart: () => {
        window.addEventListener("DOMContentLoaded", async () => {
            const currentWork = await ipcRenderer.invoke("window-channel", "getCurrentWork", "");
            startDragsnip(currentWork);
        });
    },
    handleAudio: (audioState, userPath, currentWork) => {
        if (audioState === false) {
            audioRecorder.start();
        } else {
            audioRecorder.stop(userPath, currentWork);
        }
    },
    handleVideo: (videoState, userPath, currentWork) => {
        if (videoState === false) {
            videoRecorder.start();
        } else {
            videoRecorder.stop(userPath, currentWork);
        }
    },
    registerAllShortcuts: () => {
        ipcRenderer.invoke("system-channel", "registerAllShortcuts");
    },
    unregisterAllShortcuts: () => {
        ipcRenderer.invoke("system-channel", "unregisterAllShortcuts");
    },
});
