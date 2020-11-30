/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcMain, IpcMainEvent } from "electron";
import log from "loglevel";
import { BaseChannel } from "./BaseChannel";
import { Folder, Collection } from "../../models";

export class HomeChannel extends BaseChannel {
    // public deleteRequest(channelName: string): void {
    //     ipcMain.removeAllListeners(channelName);
    // }
    public handleRequest(): void {
        ipcMain.on(this.channelName!, (event: IpcMainEvent, command: string, args: any) => {
            switch (command) {
                case "getAllData":
                case "addFolder":
                case "addCollection":
                case "deleteCollection":
                    this[command](event, args);
                    break;
                default:
                    // eslint-disable-next-line no-console
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

    /** Start operation */
    private async getAllData(event: IpcMainEvent, args: any): Promise<void> {
        const query = await Folder.findAll({
            include: { all: true, nested: true },
        });
        const data = JSON.stringify(query, null, 2);
        event.reply("loadData", data);
    }
    async addFolder(event: IpcMainEvent, args: any): Promise<void> {
        const name = args.name.toString();
        const data = await Folder.create({ name });
        event.reply("updateData", JSON.stringify(data, null, 2));
    }

    async addCollection(event: IpcMainEvent, args: any): Promise<void> {
        const data = await Collection.create({ name: args.title.toString(), folderId: args.folderId });
        event.reply("updateData", JSON.stringify(data, null, 2));
    }
    async deleteCollection(event: IpcMainEvent, args: any): Promise<void> {
        Collection.destroy({
            where: {
                id: args,
            },
        });
    }
}
