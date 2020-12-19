import { ipcMain } from "electron";
export abstract class BaseChannel {
    channelName?: string;

    constructor(channelName: string) {
        this.channelName = channelName;
    }

    public abstract handleRequest(): void;
    public abstract handleRequestOnce(): void;
    public deleteRequest(channelName: string): void {
        ipcMain.removeAllListeners(channelName);
    }
}
