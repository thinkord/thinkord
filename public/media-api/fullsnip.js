/* eslint-disable @typescript-eslint/no-var-requires */
// Nodejs built-in modules
const fs = require("fs").promises;
const path = require("path");

// Electron modules
const { desktopCapturer, ipcRenderer } = require("electron");

// Third-party modules
const { v4: uuidv4 } = require("uuid");
const log = require("loglevel");
log.setLevel("info");

const takeScreenshot = async (userPath, thumbSize, currentWork) => {
    if (!currentWork) {
        return;
    }
    const screenshotName = `${uuidv4()}.png`;
    const screenshotPath = path.join(userPath, "blob_storage", screenshotName);
    const options = { types: ["screen"], thumbnailSize: thumbSize };

    const sources = await desktopCapturer.getSources(options);
    sources.forEach(async (source) => {
        if (source.name === "Entire Screen" || source.name === "Screen 1") {
            try {
                await fs.writeFile(screenshotPath, source.thumbnail.toPNG());
                ipcRenderer.invoke("media-channel", "save", {
                    name: screenshotName,
                    path: screenshotPath,
                    type: "image",
                    current: currentWork,
                });
                ipcRenderer.invoke("window-channel", "captureSignal", "data");
                log.info("Screenshot has been saved successfully");
            } catch (err) {
                throw err;
            }
        }
    });
};

module.exports = {
    takeScreenshot,
};
