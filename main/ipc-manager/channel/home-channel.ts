/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import log from "loglevel";
import { BaseChannel } from "./base-channel";
import { Folder, Collection } from "../../models";

export class HomeChannel extends BaseChannel {
    public handleRequest(): void {
        ipcMain.handle(this.channelName!, async (event: IpcMainInvokeEvent, command: string, args: any) => {
            switch (command) {
                case "getAllData":
                    return this[command](event, args);
                case "addFolder":
                    return this[command](event, args);
                case "addCollection":
                    return this[command](event, args);
                case "deleteCollection":
                    return this[command](event, args);
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

    private async getAllData(event: IpcMainInvokeEvent, args: any): Promise<string> {
        const query = await Folder.findAll({
            include: { all: true, nested: true },
        });
        const data = JSON.stringify(query, null, 2);
        return data;
    }

    private async addFolder(event: IpcMainInvokeEvent, args: any): Promise<string> {
        const name = args.name.toString();
        const query = await Folder.create({ name });
        const data = JSON.stringify(query, null, 2);
        return data;
    }

    private async addCollection(event: IpcMainInvokeEvent, args: any): Promise<string> {
        const query = await Collection.create({ name: args.title.toString(), folderId: args.folderId });
        const data = JSON.stringify(query, null, 2);
        return data;
    }

    private async deleteCollection(event: IpcMainInvokeEvent, args: any): Promise<void> {
        Collection.destroy({
            where: {
                id: args,
            },
        });
    }
}
