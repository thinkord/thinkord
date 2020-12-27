import { app, ipcMain, IpcMainInvokeEvent, screen } from "electron";
import log from "loglevel";
import { BaseChannel } from "./base-channel";

log.setLevel("info");

export class SystemChannel extends BaseChannel {
    // public deleteRequest(channelName: string): void {
    //     ipcMain.removeAllListeners(channelName);
    // }

    public handleRequest(): void {
        ipcMain.handle(this.channelName!, async (event: IpcMainInvokeEvent, command: string, args: any) => {
            switch (command) {
                case "getUserPath":
                    return this[command]();
                case "getScreenshotSize":
                    return this[command]();
                case "getCurrentScreen":
                    return this[command]();
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

    private getUserPath(): string {
        const userPath = app.getPath("userData");
        return userPath;
    }

    private getScreenshotSize(): Record<string, unknown> {
        const screenSize = screen.getPrimaryDisplay().workAreaSize;
        const maxDimension = Math.max(screenSize.width, screenSize.height);
        const screenshotSize = {
            width: maxDimension,
            height: maxDimension,
        };
        return screenshotSize;
    }

    private getCurrentScreen(): any {
        // // eslint-disable-next-line @typescript-eslint/no-var-requires
        // const currentWindow = require("electron").getCurrentWindow();
        // const { x, y } = currentWindow.getBounds();
        // const currentScreen = screen.getAllDisplays().filter((d) => d.bounds.x === x && d.bounds.y === y)[0];
        const currentScreen = screen.getPrimaryDisplay();
        return currentScreen;
    }
}
