import { ipcMain, IpcMainEvent } from "electron";
import { IIpcChannel } from "./IIpcChannel";
import { Folder } from "../models/index";

export class HomeChannel implements IIpcChannel {
    channelName

    constructor(channelName: string) {
        this.channelName = channelName
        ipcMain.on(this.channelName, (event: IpcMainEvent, command: string, args: any) => {
            switch (command) {
                case 'getAllData':
                    this[command](event, args)
                    break;
                default:
                    console.log('There is no command in thic channel')
                    break;
            }
        })
    }

    async getAllData(event: IpcMainEvent, args: any) {
        let query = await Folder.findAll({
            include: { all: true, nested: true }
        })

        console.log(JSON.stringify(query, null, 2))
        const data = JSON.stringify(query, null, 2)
        event.reply('loadData',data)
    }

    createAllData(event: IpcMainEvent, args: any) {
      
    }

}