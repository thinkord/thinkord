import { app, BrowserWindow, ipcMain, IpcMainEvent, screen } from "electron";
import { IpcMainInvokeEvent } from "electron/main";
import log from "loglevel";
import { BaseChannel } from "./base-channel";

log.setLevel("info");

export class SystemChannel extends BaseChannel {
    // public deleteRequest(channelName: string): void {
    //     ipcMain.removeAllListeners(channelName);
    // }
    // public onRequest(): void {
    //     ipcMain.on(this.channelName!, (event: IpcMainEvent, command: string, args: any) => {
    //         switch (command) {
    //             case "getUserPath":
    //                 this[command](event);
    //                 break;
    //             case "getScreenshotSize":
    //                 this[command](event);
    //                 break;
    //             case "getCurrentScreen":
    //                 this[command](event);
    //             default:
    //                 log.warn("There is no command in thic channel");
    //                 break;
    //         }
    //     });
    // }

    // public onRequestOnce(): void {
    //     ipcMain.once(this.channelName!, (event: IpcMainEvent, command: string, args: any) => {
    //         // Should add something
    //     });
    // }

    public onRequest(): void {
        ipcMain.handle(this.channelName!, async (event: IpcMainInvokeEvent, command: string, args: any) => {
            switch (command) {
                case "getUserPath":
                    return await this[command]();
                    break;
                case "getScreenshotSize":
                    return await this[command]();
                    break;
                case "getCurrentScreen":
                    return await this[command]();
                    break;
                default:
                    log.warn("There is no command in thic channel");
                    break;
            }
        });
    }

    // public handleRequestOnce(): void {
    //     ipcMain.handleOnce(this.channelName!, (event: IpcMainInvokeEvent, command: string, args: any) => {
    //         // Should add something
    //     });
    // }

    // private getUserPath(event: IpcMainEvent): void {
    //     const userPath = app.getPath("userData");
    //     event.reply(this.channelName, userPath);
    // }

    private getUserPath(): string {
        const userPath = app.getPath("userData");
        return userPath;
    }

    // private getScreenshotSize(event: IpcMainEvent): void {
    //     const screenSize = screen.getPrimaryDisplay().workAreaSize;
    //     const maxDimension = Math.max(screenSize.width, screenSize.height);
    //     const screenshotSize = {
    //         width: maxDimension,
    //         height: maxDimension,
    //     };
    //     event.reply(this.channelName, screenshotSize);
    // }

    private getScreenshotSize(): Record<string, unknown> {
        const screenSize = screen.getPrimaryDisplay().workAreaSize;
        const maxDimension = Math.max(screenSize.width, screenSize.height);
        const screenshotSize = {
            width: maxDimension,
            height: maxDimension,
        };
        return screenshotSize;
    }

    // private getCurrentScreen(event: IpcMainEvent): void {
    //     // eslint-disable-next-line @typescript-eslint/no-var-requires
    //     const currentWindow = require("electron").getCurrentWindow();
    //     const { x, y } = currentWindow.getBounds();
    //     const currentScreen = screen.getAllDisplays().filter((d) => d.bounds.x === x && d.bounds.y === y)[0];
    //     event.reply(this.channelName, currentScreen);
    // }

    private getCurrentScreen(): any {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const currentWindow = require("electron").getCurrentWindow();
        const { x, y } = currentWindow.getBounds();
        const currentScreen = screen.getAllDisplays().filter((d) => d.bounds.x === x && d.bounds.y === y)[0];
        return currentScreen;
    }
}
