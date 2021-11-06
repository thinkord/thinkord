/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { app, globalShortcut, ipcMain, IpcMainInvokeEvent, screen } from "electron";
import log from "loglevel";
import { BaseChannel } from "./base-channel";

log.setLevel("info");

export class SystemChannel extends BaseChannel {
    public handleRequest(): void {
        ipcMain.handle(this.channelName!, async (event: IpcMainInvokeEvent, command: string, args: any) => {
            switch (command) {
                case "getNodeEnv":
                case "getUserPath":
                case "getScreenshotSize":
                case "getCurrentScreen":
                    return this[command]();
                case "registerAllShortcuts":
                    this[command](event);
                    break;
                case "unregisterAllShortcuts":
                    this[command]();
                    break;
                default:
                    log.warn(`There is no command in ${this.channelName}`);
                    break;
            }
        });
    }

    private getNodeEnv(): string | undefined {
        return process.env.NODE_ENV;
    }

    private getUserPath(): string {
        const userPath = app.getPath("userData");
        return userPath;
    }

    private getScreenshotSize(): Record<number, number> {
        const screenSize = screen.getPrimaryDisplay().workAreaSize;
        const maxDimension = Math.max(screenSize.width, screenSize.height);
        const screenshotSize = {
            width: maxDimension,
            height: maxDimension,
        };
        return screenshotSize;
    }

    private getCurrentScreen(): any {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const currentScreen = screen.getPrimaryDisplay();
        return currentScreen;
    }

    private registerAllShortcuts(event: IpcMainInvokeEvent): void {
        globalShortcut.unregisterAll();

        globalShortcut.register("Shift+F1", () => {
            event.sender.send(this.channelName!, "text");
        });

        globalShortcut.register("Shift+F2", () => {
            event.sender.send(this.channelName!, "fullsnip");
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
