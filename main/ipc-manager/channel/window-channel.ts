import { ipcMain, IpcMainEvent } from "electron";
import log from "loglevel";
import { BaseChannel } from "./base-channel";
import { ControlWindow } from "../../windows/control-window";

interface BrowserWindows {
    [key: string]: ControlWindow | undefined;
}

export class WindowChannel extends BaseChannel {
    wins: BrowserWindows;
    // controlWindow: ControlWindow | undefined;
    constructor(props: any) {
        super(props);
        this.wins = {};
    }

    public handleRequest(): void {
        ipcMain.on(this.channelName!, (event: IpcMainEvent, command: string, args: any) => {
            switch (command) {
                case "create":
                    this[command](event, args);
                    break;
                case "close":
                    this[command](event, args);
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

    // public deleteRequest(channelName: string): void {
    //     ipcMain.removeAllListeners(channelName);
    // }

    /** Start operation */
    public create(event: IpcMainEvent, args: any): void {
        if (!this.wins.controlWindow) {
            this.wins.controlWindow = new ControlWindow();
            this.wins.controlWindow.createWindow();
            this.wins.controlWindow.register();
        }
    }

    public close(event: IpcMainEvent, args: any): void {
        if (this.wins.controlWindow) {
            this.wins.controlWindow.closeWindow();
            this.deleteRequest("test-channel");
            this.wins.controlWindow = undefined;
        }
    }
}
