// Nodejs built-in modules
import * as fs from "fs";
import * as path from "path";

// Electron modules
import { app, screen, desktopCapturer, IpcMainEvent } from "electron";

// Third-party modules
import { v4 as uuidv4 } from "uuid";
import log from "loglevel";

import { Block } from "../models/";

log.setLevel("info");

const userPath = app.getPath("userData");
// const userPath = app.getPath("userData").replace(/\\/g, "\\\\");

/**
 * Take full screen snip and save image to local file system
 * @function
 * @param event IpcMainEvent
 */
const getScreenshot = (event: IpcMainEvent) => {
    const screenshotName = `${uuidv4()}.png`
    const screenshotPath = path.join(userPath, "blob_storage", screenshotName);
    const determineScreenShotSize = () => {
        const screenSize = screen.getPrimaryDisplay().workAreaSize;
        const maxDimension = Math.max(screenSize.width, screenSize.height);
        return {
            width: maxDimension,
            height: maxDimension,
        };
    };
    const thumbSize = determineScreenShotSize();
    const options = { types: ["screen"], thumbnailSize: thumbSize };

    desktopCapturer.getSources(options).then(async (sources) => {
        // if (error) return console.log(error);

        sources.forEach((source) => {
            if (source.name === "Entire Screen" || source.name === "Screen 1") {
                fs.writeFile(screenshotPath, source.thumbnail.toPNG(), async (err) => {
                    if (err) {
                        throw err;
                    } else {
                        /** should uncomment */
                        // const block = await Block.create({
                        //     id: Number(uuidv4()),
                        //     title: screenshotName,
                        //     type: "image",
                        //     bookmark: false,
                        // });
                        // await block.createFile({
                        //     id: Number(uuidv4()),
                        //     name: screenshotName,
                        //     path: screenshotPath,
                        // });
                        // event.reply("fullsnip", screenshotPath);
                        log.info("Screenshot has been saved successfully");
                    }
                });
            }
        });
    });
};

export { getScreenshot };
