import { ipcMain, IpcMainInvokeEvent, globalShortcut } from "electron";
import log from "loglevel";
import { BaseChannel } from "./base-channel";
import { ControlWindow } from "../../windows/control-window";
import { MaskWindow } from "../../windows/mask-window";

import { IpcRequest } from "../../shared/IpcRequest";
import { HomeWindow } from "../../windows/home-window";
interface BrowserWindows {
    [key: string]: ControlWindow | MaskWindow | undefined;
}

export class WindowChannel extends BaseChannel {
    wins: BrowserWindows;
    currentCollection: number | undefined;
    constructor(props: string) {
        super(props);
        this.wins = {};
    }

    public handleRequest(): void {
        ipcMain.handle(this.channelName!, async (event: IpcMainInvokeEvent, command: string, args: any) => {
            switch (command) {
                case "create":
                case "close":
                case "captureSignal":
                case "load":
                case "jump":
                    this[command](event, args);
                    break;
                case "getCurrentWork":
                    return this[command]();
                default:
                    log.warn(`There is no command in ${this.channelName}`);
                    break;
            }
        });
    }

    private getCurrentWork(): number {
        return this.currentCollection!;
    }

    public create(event: IpcMainInvokeEvent, args: any): void {
        if (args.win === "controlWin") {
            if (!this.wins.controlWindow) {
                this.currentCollection = args.id;
                this.wins.controlWindow = new ControlWindow();
                this.wins.controlWindow.createWindow();
                this.wins.controlWindow.register();
            } else {
                this.currentCollection = args.id;
                ControlWindow.sendMessage("changed", args.id);
            }
        } else if (args.win === "maskWin") {
            if (!this.wins.maskWindow) {
                this.createMaskWindow();
                MaskWindow.sendMessage("masktoCollection", args.current);
            }
        }
    }

    public close(event: IpcMainInvokeEvent, args: any): void {
        if (args.win === "controlWin") {
            if (this.wins.controlWindow) {
                this.wins.controlWindow.closeWindow();
                this.wins.controlWindow = undefined;
            }
        } else if (args.win === "maskWin") {
            if (this.wins.maskWindow) {
                this.wins.maskWindow.closeWindow();
                this.wins.maskWindow = undefined;
            }
        }
    }

    public jump(event: IpcMainInvokeEvent, args: any): string {
        HomeWindow.sendMessage("jump", args.path);
        return args.path;
    }

    private load(event: IpcMainInvokeEvent, args: any): void {
        if (args.win === "controlWin") {
            if (this.wins.controlWindow) {
                this.wins.controlWindow.loadPage(args.page);
            }
        }
    }

    private createMaskWindow = () => {
        if (this.wins.maskWindow) {
            this.wins.maskWindow.closeWindow();
            this.wins.maskWindow = undefined;
        }
        this.wins.maskWindow = new MaskWindow();
        this.wins.maskWindow.createWindow();
        this.wins.maskWindow.register();

        globalShortcut.register("Esc", () => {
            if (this.wins.maskWindow) {
                this.wins.maskWindow.closeWindow();
                this.wins.maskWindow = undefined;
            }
        });
    };

    public captureSignal(event: IpcMainInvokeEvent, args: IpcRequest): void {
        // Transfer information to different frame
        HomeWindow.sendMessage("capture", "");
    }
}
