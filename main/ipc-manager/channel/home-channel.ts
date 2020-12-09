/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcMain, IpcMainEvent } from "electron";
import log from "loglevel";
import { BaseChannel } from "./base-channel";
import { Folder, Collection } from "../../models";
// import { Block } from "../../models/block";

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
                case "orderCollection":
                case "updateCollection":
                case "deleteCollection":
                case "getHomeData":
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

    private async getHomeData(event: IpcMainEvent, args: any): Promise<void> {
        const query1 = await Folder.findAll({
            include: { all: true, nested: true },
        });
        const query2 = await Collection.findAll({ order: [["updatedAt", "ASC"]] });
        const data = JSON.stringify(query1, null, 2);
        const data2 = JSON.stringify(query2, null, 2);
        event.reply("loadData", { data, data2 });
    }

    // private async getCollection(event: IpcMainEvent, args: any): Promise<void> {
    //     const query = await Collection.findOne({
    //         where: { id: args.id },
    //         include: [{ model: Block, as: "blocks" }],
    //     });
    //     const data = JSON.stringify(query, null, 2)
    //     event.reply("loadData", data);
    // }

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

    async orderCollection(event: IpcMainEvent, args: any): Promise<void> {
        const data = await Collection.findAll({ order: [["updatedAt", "DESC"]] });
        event.reply("updateData", JSON.stringify(data, null, 2));
    }

    async updateCollection(event: IpcMainEvent, args: any): Promise<void> {
        log.info("frontend update collection: ", args);
        const { title, collectionId } = args;
        Collection.update({ name: title }, { where: { id: collectionId } });
    }
}
