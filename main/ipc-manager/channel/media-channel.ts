import { ipcMain, IpcMainEvent } from "electron";
import log from "loglevel";
import { BaseChannel } from "./base-channel";
import { getScreenshot } from "../../media-api/fullsnip";

export class MediaChannel extends BaseChannel {
    public handleRequest(): void {
        ipcMain.on(this.channelName!, (event: IpcMainEvent, command: string) => {
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

    public handleRequestOnce(): void {
        ipcMain.once(this.channelName!, (event: IpcMainEvent, command: string, args: any) => {
            // Should add something
        });
    }

    /** Start operation */
    private fullsnip(event: IpcMainEvent): void {
        getScreenshot(event);
    }
}
