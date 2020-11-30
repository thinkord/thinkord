import { ipcMain } from "electron";
export abstract class BaseChannel {
    channelName?: string;

    constructor(channelName: string) {
        this.channelName = channelName;
        // eslint-disable-next-line no-console
        console.log(`${channelName} setup`);
    }

    public abstract handleRequest(): void;
    public abstract handleRequestOnce(): void;
    // public abstract deleteRequest(channelName: string): void;
    public deleteRequest(channelName: string): void {
        ipcMain.removeAllListeners(channelName);
    }
}
