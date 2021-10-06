/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcMain, IpcMainInvokeEvent } from "electron";
import log from "loglevel";
import { BaseChannel } from "./base-channel";
import { Folder, Collection, Block } from "../../models";
import { IpcRequest } from "../../shared/IpcRequest";
import { HomeWindow } from "../../windows/home-window";

export class HomeChannel extends BaseChannel {
    private collectionId: string | undefined;
    public handleRequest(): void {
        ipcMain.handle(this.channelName!, (event: IpcMainInvokeEvent, command: string, args: IpcRequest) => {
            switch (command) {
                case "addFolder":
                case "addBlock":
                case "addCollection":
                case "orderCollection":
                case "updateFolder":
                case "updateCollection":
                case "deleteFolder":
                case "deleteCollection":
                case "deleteBlock":
                case "getHomeData":
                case "getCollection":
                case "getBlocks":
                case "getCID":
                    return this[command](event, args);
                default:
                    log.warn(`There is no command in ${this.channelName}`);
                    break;
            }
        });
    }

    /** Start operation */
    private async getHomeData(event: IpcMainInvokeEvent): Promise<Record<string, string>> {
        const query1 = await Folder.findAll({
            include: { all: true, nested: true },
        });
        const query2 = await Collection.findAll({ order: [["updatedAt", "ASC"]] });
        const data = JSON.stringify(query1, null, 2);
        const data2 = JSON.stringify(query2, null, 2);

        return { data, data2 };
    }

    private async getCollection(event: IpcMainInvokeEvent, args: IpcRequest): Promise<string> {
        const query = await Collection.findOne({
            where: { id: args.id },
            include: [Collection.associations.blocks],
        });

        const data = JSON.stringify(query, null, 2);

        return data;
    }

    private async getBlocks(event: IpcMainInvokeEvent, args: IpcRequest): Promise<string> {
        this.collectionId = args.id;
        const query = await Collection.findOne({
            where: { id: args.id },
            include: { all: true, nested: true },
        });
        const data = JSON.stringify(query, null, 2);
        return data;
    }

    private async getCID(event: IpcMainInvokeEvent): Promise<string> {
        return this.collectionId!;
    }

    async addFolder(event: IpcMainInvokeEvent, args: IpcRequest): Promise<void> {
        const name = args.name.toString();
        await Folder.create({ name });
    }

    private async addBlock(event: IpcMainInvokeEvent, args: IpcRequest): Promise<void> {
        const { title, type, description, id } = args;
        const collectionId = parseInt(id);
        await Block.create({ title, type, description, collectionId });
    }

    private async deleteFolder(event: IpcMainInvokeEvent, args: IpcRequest): Promise<void> {
        const { folderId } = args;

        const allCollections = await Collection.findAll({ where: { folderId: folderId } });
        const ids = new Array<number>();
        allCollections.forEach((data) => {
            ids.push(data.id);
        });
        HomeWindow.sendMessage("delete_tabs", JSON.stringify(ids));
        await Collection.destroy({ where: { folderId: folderId } });
        await Folder.destroy({ where: { id: folderId } });
    }

    private async deleteBlock(event: IpcMainInvokeEvent, args: IpcRequest): Promise<void> {
        const { blockId } = args;
        await Block.destroy({ where: { id: blockId } });
    }

    private async addCollection(event: IpcMainInvokeEvent, args: IpcRequest): Promise<void> {
        const { folderId } = args;
        const id = parseInt(folderId);
        await Collection.create({ name: args.title.toString(), folderId: id });
    }

    private async deleteCollection(event: IpcMainInvokeEvent, args: IpcRequest): Promise<void> {
        const { collectionId } = args;
        const ids = new Array<number>();
        ids.push(parseInt(collectionId));
        HomeWindow.sendMessage("delete_tabs", JSON.stringify(ids));
        await Collection.destroy({
            where: {
                id: collectionId,
            },
        });
    }

    private async orderCollection(event: IpcMainInvokeEvent): Promise<void> {
        await Collection.findAll({ order: [["updatedAt", "DESC"]] });
    }

    private async updateFolder(event: IpcMainInvokeEvent, args: IpcRequest): Promise<void> {
        log.info("frontend update folder: ", args);
        const { title, folderId } = args;
        Folder.update({ name: title }, { where: { id: folderId } });
    }

    private async updateCollection(event: IpcMainInvokeEvent, args: IpcRequest): Promise<void> {
        log.info("frontend update collection: ", args);
        const { title, collectionId } = args;
        Collection.update({ name: title }, { where: { id: collectionId } });
    }
}
