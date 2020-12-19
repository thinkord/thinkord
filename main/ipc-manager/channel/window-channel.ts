import { ipcMain, IpcMainEvent } from "electron";
import log from "loglevel";
import { BaseChannel } from "./base-channel";
import { ControlWindow } from "../../windows/control-window";
import { IpcRequest } from "../../shared/IpcRequest";
interface BrowserWindows {
    [key: string]: ControlWindow | undefined;
}

export class WindowChannel extends BaseChannel {
    wins: BrowserWindows;

    constructor(props: any) {
        super(props);
        this.wins = {};
    }

    public handleRequest(): void {
        ipcMain.on(this.channelName!, (event: IpcMainEvent, command: string, args: IpcRequest) => {
            switch (command) {
                case "create":
                case "close":
                    this[command](args);
                    break;
                default:
                    log.warn("There is no command in thic channel");
                    break;
            }
        });
    }

    public handleRequestOnce(): void {
        ipcMain.once(this.channelName!, (event: IpcMainEvent, command: string, args: IpcRequest) => {
            // Should add something
        });
    }

    /** Start operation */
    public create(args: IpcRequest): void {
        if (!this.wins.controlWindow) {
            this.wins.controlWindow = new ControlWindow();
            this.wins.controlWindow.createWindow(args.id);
            this.wins.controlWindow.register();
        } else {
            this.wins.controlWindow.sendMessage(args.id);
        }
    }

    public close(): void {
        if (this.wins.controlWindow) {
            this.wins.controlWindow.closeWindow();
            this.deleteRequest("test-channel");
            this.wins.controlWindow = undefined;
        }
    }
}
