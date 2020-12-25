/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcMain, IpcMainEvent } from "electron";
import log from "loglevel";
import { BaseChannel } from "./BaseChannel";
import { ControlWindow } from "../../windows/ControlWindow";
import { UsageChannel } from "../usage/UsageChannel";

export class WindChannel extends BaseChannel {
    controlWindow: ControlWindow | undefined;

    public handleRequest(): void {
        ipcMain.on(this.channelName!, (event: IpcMainEvent, command: string, args: any) => {
            switch (command) {
                case "create":
                case "close":
                    this[command](event, args);
                    break;
                default:
                    // eslint-disable-next-line no-console
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
        if (!this.controlWindow) {
            this.controlWindow = new ControlWindow();
            this.controlWindow.createWindow();
            this.controlWindow.register();
        }
    }

    public close(event: IpcMainEvent, args: any): void {
        if (this.controlWindow) {
            this.controlWindow.closeWindow();
            this.deleteRequest("testprocess");
            this.controlWindow = undefined;
        }
    }
}
