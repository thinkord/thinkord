import { ipcMain, IpcMainInvokeEvent } from "electron";
import { v4 as uuidv4 } from "uuid";
import log from "loglevel";
import { BaseChannel } from "./base-channel";
import { Block } from "../../models";

log.setLevel("info");

export class MediaChannel extends BaseChannel {
    public handleRequest(): void {
        ipcMain.handle(this.channelName!, async (event: IpcMainInvokeEvent, command: string, args: any) => {
            switch (command) {
                case "save":
                    await this[command](event, args);
                    break;
                default:
                    log.warn(`There is no command in ${this.channelName}`);
                    break;
            }
        });
    }

    private async createTextBlock(type: string, description: string, collectionId: number): Promise<boolean> {
        const data = await Block.create({
            id: Number(uuidv4()),
            title: "Edit title",
            type,
            description,
            bookmark: false,
            collectionId,
        });

        return data ? true : false;
    }

    private async createBlockAndFile(name: string, path: string, type: string, collectionId: number): Promise<boolean> {
        const block = await Block.create({
            id: Number(uuidv4()),
            title: name,
            type,
            bookmark: false,
            collectionId,
        });
        const data = await block.createFile({
            id: Number(uuidv4()),
            name: name,
            path: path,
        });

        return data ? true : false;
    }

    private async save(event: IpcMainInvokeEvent, args: any): Promise<boolean> {
        const type = args.type;
        const collectionId = parseInt(args.current);
        let isSave = false;
        if (type === "text") {
            isSave = await this.createTextBlock(type, args.text, collectionId);
        } else {
            isSave = await this.createBlockAndFile(args.name, args.path, type, collectionId);
        }

        return isSave;
    }
}
