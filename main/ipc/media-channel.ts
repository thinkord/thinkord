import { ipcMain, IpcMainEvent } from "electron";
import log from "loglevel";
import { IIpcChannel } from "./i-ipc-channel";
// import { getScreenshot } from "../media-api/fullsnip";

export class MediaChannel implements IIpcChannel {
    channelName;

    constructor(channelName: string) {
        this.channelName = channelName;
        ipcMain.on(this.channelName, (event: IpcMainEvent, command: string, args: any) => {
            switch (command) {
                case "fullsnip":
                    this[command](event);
                    break;
                default:
                    log.warn("There is no command in thic channel");
                    break;
            }
        });
    }

    fullsnip(event: IpcMainEvent) {
        // getScreenshot(event);
    }
}
