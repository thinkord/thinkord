/* eslint-disable @typescript-eslint/no-var-requires */
// Nodejs built-in modules
const fs = require("fs");
const path = require("path");

// Electron modules
const { desktopCapturer, ipcRenderer } = require("electron");

// Third-party modules
const { v4: uuidv4 } = require("uuid");
const log = require("loglevel");

log.setLevel("info");

/**
 * Take full screen snip and save image to local file system
 */
const takeScreenshot = (userPath, thumbSize) => {
    const screenshotName = `${uuidv4()}.png`;
    const screenshotPath = path.join(userPath, "blob_storage", screenshotName);
    const options = { types: ["screen"], thumbnailSize: thumbSize };

    desktopCapturer.getSources(options).then(async (sources) => {
        sources.forEach((source) => {
            if (source.name === "Entire Screen" || source.name === "Screen 1") {
                fs.writeFile(screenshotPath, source.thumbnail.toPNG(), async (err) => {
                    if (err) {
                        throw err;
                    } else {
                        ipcRenderer.send("media-channel", "fullsnip", { name: screenshotName, path: screenshotPath });
                        log.info("Screenshot has been saved successfully");
                    }
                });
            }
        });
    });
};

module.exports.takeScreenshot = takeScreenshot;
