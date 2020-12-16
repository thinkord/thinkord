import { app, ipcMain, IpcMainEvent, screen } from "electron";
import log from "loglevel";
import { BaseChannel } from "./base-channel";

log.setLevel("info");

export class SystemChannel extends BaseChannel {
    // public deleteRequest(channelName: string): void {
    //     ipcMain.removeAllListeners(channelName);
    // }
    public handleRequest(): void {
        ipcMain.on(this.channelName!, (event: IpcMainEvent, command: string, args: any) => {
            switch (command) {
                case "getUserPath":
                    this[command](event);
                    break;
                case "getScreenshotSize":
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

    private getUserPath(event: IpcMainEvent): void {
        const userPath = app.getPath("userData");
        event.reply(this.channelName, userPath);
    }

    private getScreenshotSize(event: IpcMainEvent): void {
        const screenSize = screen.getPrimaryDisplay().workAreaSize;
        const maxDimension = Math.max(screenSize.width, screenSize.height);
        const screenshotSize = {
            width: maxDimension,
            height: maxDimension,
        };
        event.reply(this.channelName, screenshotSize);
    }
}
