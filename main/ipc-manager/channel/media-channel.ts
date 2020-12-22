import { ipcMain, IpcMainEvent } from "electron";
import { v4 as uuidv4 } from "uuid";
import log from "loglevel";
import { BaseChannel } from "./base-channel";
import { Block } from "../../models";

log.setLevel("info");

export class MediaChannel extends BaseChannel {
    // public deleteRequest(channelName: string): void {
    //     ipcMain.removeAllListeners(channelName);
    // }
    public handleRequest(): void {
        ipcMain.on(this.channelName!, (event: IpcMainEvent, command: string, args: any) => {
            switch (command) {
                case "saveFullsnip":
                    this[command](event, args);
                    break;
                case "dragsnip":
                    break;
                case "saveVideo":
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

    private async saveFullsnip(event: IpcMainEvent, args: any): Promise<void> {
        const block = await Block.create({
            id: Number(uuidv4()),
            title: args.name,
            type: "image",
            bookmark: false,
        });

        await block.createFile({
            id: Number(uuidv4()),
            name: args.name,
            path: args.path,
        });
    }

    private async saveVideo(event: IpcMainEvent, args: any): Promise<void> {
        const block = await Block.create({
            id: Number(uuidv4()),
            title: args.name,
            type: "video",
            bookmark: false,
        });

        await block.createFile({
            id: Number(uuidv4()),
            name: args.name,
            path: args.path,
        });
    }
}
