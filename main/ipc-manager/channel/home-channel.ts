/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IpcMain, ipcMain, IpcMainEvent } from "electron";
import log from "loglevel";
import { BaseChannel } from "./base-channel";
import { Folder, Collection, Block } from "../../models";
import { IpcRequest } from "../../shared/IpcRequest";

const map = new Map([
    ["getHomeData", "loadData"],
    ["getCollection", "loadData"],
    ["addFolder", "updateData"],
    ["addBlock", "updateData"],
    ["deleteBlock", "updateData"],
    ["addCollection", "updateData"],
    ["orderCollection", "updateData"],
]);
export class HomeChannel extends BaseChannel {
    private collectionId: string | undefined;
    public handleRequest(): void {
        ipcMain.on(this.channelName!, (event: IpcMainEvent, command: string, args: IpcRequest) => {
            switch (command) {
                case "addFolder":
                case "addBlock":
                case "addCollection":
                case "orderCollection":
                case "updateCollection":
                case "deleteCollection":
                case "deleteBlock":
                case "getHomeData":
                case "getCollection":
                case "getBlocks":
                case "getCID":
                    this[command](event, args);
                    break;
                default:
                    log.warn("There is no command in thic channel");
                    break;
            }
        });
    }

    /** Start operation */
    private async getHomeData(event: IpcMainEvent): Promise<void> {
        const query1 = await Folder.findAll({
            include: [Folder.associations.collections],
        });
        const query2 = await Collection.findAll({ order: [["updatedAt", "ASC"]] });
        const data = JSON.stringify(query1, null, 2);
        const data2 = JSON.stringify(query2, null, 2);
        event.reply("loadData", { data, data2 });
    }

    private async getCollection(event: IpcMainEvent, args: IpcRequest): Promise<void> {
        this.collectionId = args.id;
        const query = await Collection.findOne({
            where: { id: args.id },
            include: [Collection.associations.blocks],
        });

        const data = JSON.stringify(query, null, 2);
        event.reply("loadData", data);
    }

    private async getBlocks(event: IpcMainEvent, args: IpcRequest): Promise<void> {
        this.collectionId = args.id;
        const query = await Collection.findOne({
            where: { id: args.id },
            include: [Collection.associations.blocks],
        });
        const data = JSON.stringify(query, null, 2);
        event.reply("loadData", data);
    }

    private async getCID(event: IpcMainEvent): Promise<void> {
        event.reply("getCID", this.collectionId);
    }

    async addFolder(event: IpcMainEvent, args: IpcRequest): Promise<void> {
        const name = args.name.toString();
        const data = await Folder.create({ name });
        event.reply("updateData", JSON.stringify(data, null, 2));
    }

    private async addBlock(event: IpcMainEvent, args: IpcRequest): Promise<void> {
        const { title, type, description, id } = args;
        const collectionId = parseInt(id);
        const data = await Block.create({ title, type, description, collectionId });
        event.reply("updateData", JSON.stringify(data, null, 2));
    }

    private async deleteBlock(event: IpcMainEvent, args: IpcRequest): Promise<void> {
        const { blockId } = args;
        await Block.destroy({ where: { id: blockId } });
        event.reply("updateData");
    }

    async addCollection(event: IpcMainEvent, args: IpcRequest): Promise<void> {
        const { folderId } = args;
        const id = parseInt(folderId);
        const data = await Collection.create({ name: args.title.toString(), folderId: id });
        event.reply("updateData", JSON.stringify(data, null, 2));
    }

    async deleteCollection(event: IpcMainEvent, args: IpcRequest): Promise<void> {
        await Collection.destroy({
            where: {
                id: args,
            },
        });
    }

    async orderCollection(event: IpcMainEvent): Promise<void> {
        const data = await Collection.findAll({ order: [["updatedAt", "DESC"]] });
        event.reply("updateData", JSON.stringify(data, null, 2));
    }

    async updateCollection(event: IpcMainEvent, args: IpcRequest): Promise<void> {
        log.info("frontend update collection: ", args);
        const { title, collectionId } = args;
        Collection.update({ name: title }, { where: { id: collectionId } });
    }
}
