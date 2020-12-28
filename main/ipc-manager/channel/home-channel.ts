/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import log from "loglevel";
import { BaseChannel } from "./base-channel";
import { Folder, Collection } from "../../models";
// import { Block } from "../../models/block";

export class HomeChannel extends BaseChannel {
    public handleRequest(): void {
        ipcMain.on(this.channelName!, async (event: IpcMainEvent, command: string, args: any) => {
            switch (command) {
                case "addFolder":
                case "addCollection":
                case "orderCollection":
                case "updateCollection":
                case "deleteCollection":
                case "getHomeData":
                    this[command](event, args);
                    break;
                default:
                    log.warn("There is no command in thic channel");
                    break;
            }
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

    // private async getAllData(event: IpcMainEvent, args: any): Promise<void> {
    //     const query = await Folder.findAll({
    //         include: { all: true, nested: true },
    //     });
    //     const data = JSON.stringify(query, null, 2);
    //     return data;
    // }

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
