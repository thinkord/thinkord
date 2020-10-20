import { ipcMain, IpcMainEvent } from "electron";
import log from "loglevel";
import { IIpcChannel } from "./IIpcChannel";
import { loadFile } from "../utils/file";
export class FileChannel implements IIpcChannel {
    channelName;

    constructor(channelName: string) {
        this.channelName = channelName;
        ipcMain.on(this.channelName, (event: IpcMainEvent, command: string, args: any) => {
            switch (command) {
                case "save":
                case "delete":
                case "load":
                    this[command](event, args);
                    break;
                default:
                    log.warn("There is no command in thic channel");
                    break;
            }
        });
    }

    save(event: IpcMainEvent, args: any) {
        log.debug(args);
        // event.reply("fuck", "u bitch");
    }

    async load(event: IpcMainEvent, args: any) {
        const data = await loadFile();
        event.reply("loadComplete", data);
    }

    delete(event: IpcMainEvent, args: any) {
        log.debug(args);
    }

    // getName(): string {
    //     throw new Error("Method not implemented.");
    // }
    // setName(name: string) {
    //     throw new Error("Method not implemented.");
    // }
}
