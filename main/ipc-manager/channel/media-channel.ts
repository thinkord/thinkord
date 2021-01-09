import { ipcMain, IpcMainInvokeEvent } from "electron";
import { v4 as uuidv4 } from "uuid";
import log from "loglevel";
import { BaseChannel } from "./base-channel";
import { Block } from "../../models";

log.setLevel("info");

export class MediaChannel extends BaseChannel {
    public handleRequest(): void {
        ipcMain.handle(this.channelName!, (event: IpcMainInvokeEvent, command: string, args: any) => {
            switch (command) {
                case "save":
                    this[command](event, args);
                    break;
                default:
                    log.warn(`There is no command in ${this.channelName}`);
                    break;
            }
        });
    }

    private createTextBlock(type: string, description: string, collectionId: number) {
        Block.create({
            id: Number(uuidv4()),
            title: "Edit title",
            type,
            description,
            bookmark: false,
            collectionId,
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

    private async save(event: IpcMainInvokeEvent, args: any): Promise<void> {
        const type = args.type;
        const collectionId = parseInt(args.current);
        if (type === "text") this.createTextBlock(type, args.text, collectionId);
        else this.createBlockAndFile(args.name, args.path, type, collectionId);
    }

    // private handleDragsnip(event: IpcMainEvent, args: any): void {
    //     const type = args.type;

    //     if (type === "select") {
    //         event.reply("capture-screen", { type: "select" });
    //     }
    // }
}
