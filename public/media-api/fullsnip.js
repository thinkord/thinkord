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
                        ipcRenderer.invoke("media-channel", "saveImage", {
                            name: screenshotName,
                            path: screenshotPath,
                        });
                        log.info("Screenshot has been saved successfully");
                    }
                    // const sources = await desktopCapturer.getSources(options);
                    // sources.forEach(async (source) => {
                    //     if (source.name === "Entire Screen" || source.name === "Screen 1") {
                    //         try {
                    //             await fs.writeFile(screenshotPath, source.thumbnail.toPNG());
                    //             ipcRenderer.send("media-channel", "fullsnip", {
                    //                 name: screenshotName,
                    //                 path: screenshotPath,
                    //                 current: currentWork,
                });
                //     log.info("Screenshot has been saved successfully");
                // } catch (err) {
                //     throw err;
                // }
            }
        });
    });
};

module.exports = {
    takeScreenshot,
};
