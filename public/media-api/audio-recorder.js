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
    stop(userPath) {
        this.mediaRecorder.onstop = () => {
            log.info("saving video file as mp3");
            const recName = `${uuidv4()}.mp3`;
            const recPath = path.join(userPath, "blob_storage", recName);
            const reader = new FileReader();
            const audioBlob = new Blob(this.audioChunks, { type: "audio/mp3" });
            reader.readAsArrayBuffer(audioBlob);
            reader.onload = () => {
                if (reader.readyState == 2 && reader.result) {
                    const audioBuffer = Buffer.from(reader.result);
                    fs.writeFile(recPath, audioBuffer, (err) => {
                        if (err) {
                            log.error(err);
                        } else {
                            log.info("Your audio file has been saved");
                            ipcRenderer.invoke("media-channel", "saveAudio", { name: recName, path: recPath });
                        }
                    });
                } else log.error("FileReader has problems reading blob");
            };
        };
        try {
            this.mediaRecorder.stop();
            log.info("stop audio recording");
        } catch (err) {
            log.error(err);
        }

        this.mediaRecorder = undefined;
    }
}

module.exports.AudioRecorder = AudioRecorder;
