import { ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import { v4 as uuidv4 } from "uuid";
import log from "loglevel";
import { BaseChannel } from "./base-channel";
import { Block } from "../../models";
import { IpcRequest } from "../../shared/IpcRequest";

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
                // ipcMain.on(this.channelName!, (event: IpcMainEvent, command: string, args: IpcRequest) => {
                //     switch (command) {
                //         case "fullsnip":
                //         case "handleVideo":
                //             this[command](event, args);
                //             break;
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

    private async fullsnip(event: IpcMainEvent, args: IpcRequest): Promise<void> {
        const block = await Block.create({
            title: args.name,
            type: "image",
            bookmark: false,
            collectionId: parseInt(args.current),
        });

        await block.createFile({
            name: args.name,
            path: args.path,
        });
    }

    private handleVideo(event: IpcMainEvent, args: IpcRequest): void {
        log.info(args);
        const status = args.status;
        // if (status === false) VideoRecorder.start();
        // else if (status === true) VideoRecorder.stop();
    }
}
