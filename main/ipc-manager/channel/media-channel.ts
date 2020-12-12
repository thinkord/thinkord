import { ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import { v4 as uuidv4 } from "uuid";
import log from "loglevel";
import { BaseChannel } from "./base-channel";
import { Block } from "../../models";

log.setLevel("info");

export class MediaChannel extends BaseChannel {
    public handleRequest(): void {
        ipcMain.handle(this.channelName!, async (event: IpcMainInvokeEvent, command: string, args: any) => {
            switch (command) {
                case "saveImage":
                    this[command](event, args);
                    break;
                case "saveAudio":
                    this[command](event, args);
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

    // public handleRequestOnce(): void {
    //     ipcMain.handleOnce(this.channelName!, (event: IpcMainInvokeEvent, command: string, args: any) => {
    //         // Should add something
    //     });
    // }

    // public deleteRequest(channelName: string): void {
    //     ipcMain.removeAllListeners(channelName);
    // }

    private async createBlockAndFile(name: string, path: string, type: string): Promise<void> {
        // const block = await Block.create({
        //     id: Number(uuidv4()),
        //     title: name,
        //     type: type,
        //     bookmark: false,
        // });
        // await block.createFile({
        //     id: Number(uuidv4()),
        //     name: name,
        //     path: path,
        // });
    }

    private async saveImage(event: IpcMainInvokeEvent, args: any): Promise<void> {
        this.createBlockAndFile(args.name, args.path, "image");
    }

    // private handleDragsnip(event: IpcMainEvent, args: any): void {
    //     const type = args.type;

    //     if (type === "select") {
    //         event.reply("capture-screen", { type: "select" });
    //     }
    // }

    private async saveAudio(event: IpcMainInvokeEvent, args: any): Promise<void> {
        this.createBlockAndFile(args.name, args.path, "audio");
    }

    private async saveVideo(event: IpcMainInvokeEvent, args: any): Promise<void> {
        this.createBlockAndFile(args.name, args.path, "video");
    }
}
