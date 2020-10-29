import { ipcMain, IpcMainEvent } from "electron";
import log from "loglevel";
import { IIpcChannel } from "./IIpcChannel";
import { Folder, Collection } from "../models";
// import { Collection } from "../models/collection";

export class HomeChannel implements IIpcChannel {
    channelName;

    constructor(channelName: string) {
        this.channelName = channelName;
        ipcMain.on(this.channelName, (event: IpcMainEvent, command: string, args: any) => {
            switch (command) {
                case "getAllData":
                case 'addFolder':
                case 'addCollection':
                    this[command](event, args);
                    break;
                default:
                    log.warn("There is no command in thic channel");
                    break;
            }
        });
    }

    async getAllData(event: IpcMainEvent, args: any) {
        const query = await Folder.findAll({
            include: { all: true, nested: true },
        });
        const data = JSON.stringify(query, null, 2);
        event.reply("loadData", data);
    }

    async addFolder(event: IpcMainEvent, args: any) {

        let name = args.name.toString()
        let data = await Folder.create({ name })
        event.reply("updateData", JSON.stringify(data, null, 2))
    }

    async addCollection(event: IpcMainEvent, args: any) {
        let data = await Collection.create({ name: args.title.toString(), folderId: args.folderId })
        event.reply("updateData", JSON.stringify(data, null, 2))
    }
}
