/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ipcMain, IpcMainEvent, Menu } from "electron";
import log from "loglevel";
import { IIpcChannel } from "./IIpcChannel";
import { Folder } from "../models";
export class SystemChannel implements IIpcChannel {
    channelName;

    constructor(channelName: string) {
        this.channelName = channelName;
        ipcMain.on(this.channelName, (event: IpcMainEvent, command: string, args: any) => {
            switch (command) {
                case "getHomeContextMenu":
                    this[command](event, args);
                    break;
                default:
                    log.warn("There is no command in thic channel");
                    break;
            }
        });
    }

    getHomeContextMenu(event: IpcMainEvent, args: any): void {
        const homeContextMenu = Menu.buildFromTemplate([
            {
                label: "delete Folder",
                async click() {
                    await Folder.destroy({
                        where: { id: args },
                    });
                    event.reply("contextUpdate", "deleteFolder");
                },
            },
            {
                label: "Rename Folder",
                async click() {
                    // await Folder.destroy({
                    //     where: { id: args },
                    // });
                    // event.reply("contextUpdate", "renameFolder");
                },
            },
        ]);
        homeContextMenu.popup();
    }
}
