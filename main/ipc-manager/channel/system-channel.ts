import { app, globalShortcut, ipcMain, IpcMainInvokeEvent, screen } from "electron";
import log from "loglevel";
import { BaseChannel } from "./base-channel";

log.setLevel("info");

export class SystemChannel extends BaseChannel {
    public handleRequest(): void {
        ipcMain.handle(this.channelName!, async (event: IpcMainInvokeEvent, command: string, args: any) => {
            switch (command) {
                case "getUserPath":
                    return this[command]();
                case "getScreenshotSize":
                    return this[command]();
                case "getCurrentScreen":
                    return this[command]();
                case "registerAllShortcuts":
                    this[command](event);
                    break;
                case "unregisterAllShortcuts":
                    this[command]();
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

    // public deleteRequest(channelName: string): void {
    //     ipcMain.removeAllListeners(channelName);
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

    private registerAllShortcuts(event: IpcMainInvokeEvent): void {
        globalShortcut.unregisterAll();

        globalShortcut.register("Shift+F1", () => {
            event.sender.send(this.channelName!, "fullsnip");
        });

        globalShortcut.register("Shift+F2", () => {
            event.sender.send(this.channelName!, "open-text-win");
        });

        globalShortcut.register("Shift+F3", () => {
            event.sender.send(this.channelName!, "dragsnip");
        });

        globalShortcut.register("Shift+F4", () => {
            event.sender.send(this.channelName!, "record-audio");
        });

        globalShortcut.register("Shift+F5", () => {
            event.sender.send(this.channelName!, "record-video");
        });

        log.info("All shortcuts are registered");
    }

    private unregisterAllShortcuts(): void {
        globalShortcut.unregisterAll();

        log.info("All shortcuts are unregistered");
    }
}
