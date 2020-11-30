/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcMain, IpcMainEvent } from "electron";
import log from "loglevel";
import { BaseChannel } from "./BaseChannel";

export class TestChannel extends BaseChannel {
    // public deleteRequest(channelName: string): void {
    //     ipcMain.removeAllListeners(channelName);
    // }
    public handleRequest(): void {
        ipcMain.on(this.channelName!, (event: IpcMainEvent, command: string, args: any) => {
            switch (command) {
                case "test":
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

    /** Start operation */
    private test(event: IpcMainEvent, args: any): void {
        // eslint-disable-next-line no-console
        console.log(args);
    }
}
