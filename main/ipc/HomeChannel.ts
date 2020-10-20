import { ipcMain, IpcMainEvent } from "electron";
import log from "loglevel";
import { IIpcChannel } from "./IIpcChannel";
import { Folder } from "../models/index";

export class HomeChannel implements IIpcChannel {
    channelName;

    constructor(channelName: string) {
        this.channelName = channelName;
        ipcMain.on(this.channelName, (event: IpcMainEvent, command: string, args: any) => {
            switch (command) {
                case "getAllData":
                    // case 'getFolder':
                    // case 'getCollection':
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
}
