import { ipcMain } from "electron";
import log from "loglevel";

log.setLevel("info");
export abstract class BaseChannel {
    channelName?: string;

    constructor(channelName: string) {
        this.channelName = channelName;
        log.info(`${channelName} setup`);
    }

    public abstract handleRequest(): void;
    // public abstract handleRequestOnce(): void;
    // public abstract deleteRequest(channelName: string): void;
    public deleteRequest(channelName: string): void {
        ipcMain.removeAllListeners(channelName);
    }
}
