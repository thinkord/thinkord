/* eslint-disable @typescript-eslint/no-var-requires */
// Nodejs built-in modules
const fs = require("fs");
const path = require("path");

const { desktopCapturer, ipcRenderer } = require("electron");

const { v4: uuidv4 } = require("uuid");
const log = require("loglevel");

log.setLevel("info");

class VideoRecorder {
    mediaRecorder;
    videoChunks;

    init() {
        this.mediaRecorder = undefined;
        this.videoChunks = [];
    }

    /**
     * Start recording video
     * @method
     */
    async start() {
        this.init();
        const handleStream = (stream) => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.videoChunks = [];
                    this.videoChunks.push(event.data);
                }
            };
            this.mediaRecorder.start();
            log.info("Start video recording");
        };

        const handleError = (err) => {
            log.error(err);
        };

        const sources = await desktopCapturer.getSources({ types: ["screen"] });
        sources.forEach(async (source) => {
            if (source.name === "Entire Screen" || source.name === "Screen 1") {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        audio: {
                            mandatory: {
                                chromeMediaSource: "desktop",
                            },
                        },
                        video: {
                            mandatory: {
                                chromeMediaSource: "desktop",
                            },
                        },
                    });
                    handleStream(stream);
                } catch (err) {
                    handleError(err);
                }
            }
        });
    }

    /**
     * Stop recording video
     * @method
     * @param {string} userPath
     */
    stop(userPath, currentWork) {
        if (!currentWork) {
            return;
        }
        this.mediaRecorder.onstop = () => {
            log.info("saving video file as mp4");
            const recName = `${uuidv4()}.mp4`;
            const recPath = path.join(userPath, "blob_storage", recName);
            const reader = new FileReader();
            const videoBlob = new Blob(this.videoChunks, { type: "video/mp4" });
            reader.readAsArrayBuffer(videoBlob);
            reader.onload = () => {
                if (reader.readyState == 2 && reader.result) {
                    const videoBuffer = Buffer.from(reader.result);
                    fs.writeFile(recPath, videoBuffer, (err) => {
                        if (err) {
                            log.error(err);
                        } else {
                            log.info("Your video file has been saved");
                            ipcRenderer.invoke("media-channel", "saveVideo", {
                                name: recName,
                                path: recPath,
                                current: currentWork,
                            });
                            ipcRenderer.invoke("window-channel", "captureSignal", "data");
                        }
                    });
                } else log.error("FileReader has problems reading blob");
            };
        };
        try {
            this.mediaRecorder.stop();
            log.info("stop video recording");
        } catch (err) {
            log.error(err);
        }

        this.mediaRecorder = undefined;
    }
}

module.exports.VideoRecorder = VideoRecorder;
