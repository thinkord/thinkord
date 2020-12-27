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
                    // case "fullsnip":
                    // case "handleVideo":
                    this[command](event, args);
                    break;
                case "saveAudio":
                case "saveVideo":
                    this[command](event, args);
                    break;

                default:
                    log.warn("There is no command in thic channel");
                    break;
            }
        });
    }

    private async createBlockAndFile(name: string, path: string, type: string, collectionId: number): Promise<void> {
        const block = await Block.create({
            id: Number(uuidv4()),
            title: name,
            type,
            bookmark: false,
            collectionId,
        });
        await block.createFile({
            id: Number(uuidv4()),
            name: name,
            path: path,
        });
    }

    private async saveImage(event: IpcMainInvokeEvent, args: any): Promise<void> {
        this.createBlockAndFile(args.name, args.path, "image", parseInt(args.current));
    }

    // private handleDragsnip(event: IpcMainEvent, args: any): void {
    //     const type = args.type;

    //     if (type === "select") {
    //         event.reply("capture-screen", { type: "select" });
    //     }
    // }

    private async saveAudio(event: IpcMainInvokeEvent, args: any): Promise<void> {
        this.createBlockAndFile(args.name, args.path, "audio", parseInt(args.current));
    }

    private async saveVideo(event: IpcMainInvokeEvent, args: any): Promise<void> {
        this.createBlockAndFile(args.name, args.path, "video", parseInt(args.current));
    }

    private handleVideo(event: IpcMainEvent, args: IpcRequest): void {
        log.info(args);
        const status = args.status;
        // if (status === false) VideoRecorder.start();
        // else if (status === true) VideoRecorder.stop();
    }
}
