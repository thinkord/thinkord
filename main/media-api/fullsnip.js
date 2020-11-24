// Nodejs built-in modules
import * as fs from "fs";
import * as path from "path";

// Electron modules
import { app, screen, desktopCapturer } from "electron";

// Third-party modules
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";
import log from "loglevel";

// import { Block, File } from "../models/index";

log.setLevel("info");

const userPath = app.getPath("userData");
// const userPath = app.getPath("userData").replace(/\\/g, "\\\\");

/**
 * Take full screen snip and save image to local file system
 * @function
 * @param event IpcMainEvent
 */
const getScreenshot = (event) => {
    let screenshotPath = path.join(userPath, "blob_storage", `${uuidv1()}.png`);
    const determineScreenShotSize = () => {
        const screenSize = screen.getPrimaryDisplay().workAreaSize;
        const maxDimension = Math.max(screenSize.width, screenSize.height);
        return {
            width: maxDimension,
            height: maxDimension,
        };
    };
    let thumbSize = determineScreenShotSize();
    let options = { types: ["screen"], thumbnailSize: thumbSize };

    desktopCapturer.getSources(options).then(async (sources) => {
        // if (error) return console.log(error);

        sources.forEach((source) => {
            if (source.name === "Entire Screen" || source.name === "Screen 1") {
                fs.writeFile(screenshotPath, source.thumbnail.toPNG(), (err) => {
                    if (err) {
                        throw err;
                    } else {
                        // event.reply("fullsnip", screenshotPath);
                        log.info("Screenshot has been saved successfully");
                    }
                });
            }
        });
    });
};

export { getScreenshot };
