/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const { ipcRenderer } = require("electron");

const { v4: uuidv4 } = require("uuid");
const log = require("loglevel");

log.setLevel("info");

class AudioRecorder {
    mediaRecorder;
    audioChunks;

    init() {
        this.mediaRecorder = undefined;
        this.audioChunks = [];
    }

    /**
     * Start recording audio
     * @method
     */
    async start() {
        this.init();
        const handleStream = (stream) => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.audioChunks = [];
                    this.audioChunks.push(event.data);
                }
            };
            this.mediaRecorder.start();
            log.info("Start audio recording");
            ipcRenderer.invoke("media-channel", "notify", {
                media: "audio",
                state: "on",
            });
        };

        const handleError = (err) => {
            log.error(err);
        };

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            handleStream(stream);
        } catch (err) {
            handleError(err);
        }
    }

    /**
     * Stop recording audio and save audio file to file system.
     * @method
     * @param {string} userPath
     */
    stop(userPath, currentWork) {
        if (!currentWork) {
            return;
        }
        this.mediaRecorder.onstop = async () => {
            log.info("saving audio file as mp3");
            const env = await ipcRenderer.invoke("system-channel", "getNodeEnv");
            const recName = `${uuidv4()}.mp3`;
            const recPath = env === "development" ? `media/${recName}` : path.join(userPath, "blob_storage", recName);
            // const recPath = path.join(userPath, "blob_storage", recName);
            const reader = new FileReader();
            const audioBlob = new Blob(this.audioChunks, { type: "audio/mp3" });
            reader.readAsArrayBuffer(audioBlob);
            reader.onload = async () => {
                if (reader.readyState == 2 && reader.result) {
                    const audioBuffer = Buffer.from(reader.result);
                    await fs.writeFile(
                        env === "development" ? `./public/${recPath}` : `${recPath}`,
                        audioBuffer,
                        (err) => {
                            if (err) {
                                log.error(err);
                            } else {
                                log.info("Your audio file has been saved");
                                ipcRenderer
                                    .invoke("media-channel", "save", {
                                        name: recName,
                                        path: recPath,
                                        type: "audio",
                                        current: currentWork,
                                    })
                                    .then(() => {
                                        ipcRenderer.invoke("window-channel", "captureSignal", "data");
                                    });
                            }
                        }
                    );
                } else log.error("FileReader has problems reading blob");
            };
        };
        try {
            this.mediaRecorder.stop();
            ipcRenderer.invoke("media-channel", "notify", {
                media: "audio",
                state: "off",
            });
            log.info("stop audio recording");
        } catch (err) {
            log.error(err);
        }

        this.mediaRecorder = undefined;
    }
}

module.exports.AudioRecorder = AudioRecorder;
