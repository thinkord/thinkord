import { ipcMain, IpcMainEvent, globalShortcut } from "electron";
import log from "loglevel";
import { BaseChannel } from "./base-channel";
import { ControlWindow } from "../../windows/control-window";
import { MaskWindow } from "../../windows/mask-window";

interface BrowserWindows {
    [key: string]: ControlWindow | MaskWindow | undefined;
}

export class WindowChannel extends BaseChannel {
    wins: BrowserWindows;
    // controlWindow: ControlWindow | undefined;
    constructor(props: any) {
        super(props);
        this.wins = {};
    }

    public handleRequest(): void {
        ipcMain.on(this.channelName!, (event: IpcMainEvent, command: string, args: any) => {
            switch (command) {
                case "create":
                    this[command](event, args);
                    break;
                case "close":
                    this[command](event, args);
                    break;
                default:
                    log.warn("There is no command in thic channel");
                    break;
            }
        });
    }

    public handleRequestOnce(): void {
        ipcMain.once(this.channelName!, (event: IpcMainEvent, command: string, args: any) => {
            // Should add something
        });
    }

    // public deleteRequest(channelName: string): void {
    //     ipcMain.removeAllListeners(channelName);
    // }

    public create(event: IpcMainEvent, args: any): void {
        if (args.win === "controlWin") {
            if (!this.wins.controlWindow) {
                this.wins.controlWindow = new ControlWindow();
                this.wins.controlWindow.createWindow();
                this.wins.controlWindow.register();
            }
        } else if (args.win === "maskWin") {
            if (!this.wins.maskWindow) {
                this.createMaskWindow(args.type);
            }
        }
    }

    public close(event: IpcMainEvent, args: any): void {
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

    private createMaskWindow = (type: string) => {
        if (this.wins.maskWindow) {
            this.wins.maskWindow.closeWindow();
            this.wins.maskWindow = undefined;
        }
        this.wins.maskWindow = new MaskWindow();
        this.wins.maskWindow.createWindow();
        this.wins.maskWindow.register();
        // if (type === "start") {
        //     this.captureScreen();
        // } else if (type === "complete") {
        //     // nothing
        // }
        // } else if (type === "select") {
        //     win.webContents.send("capture-screen", { type: "select" });
        // }

        globalShortcut.register("Esc", () => {
            if (this.wins.maskWindow) {
                this.wins.maskWindow.closeWindow();
                this.wins.maskWindow = undefined;
            }
        });

        ipcMain.on("dragsnip-saved", (event, dragsnipPath) => {
            if (this.wins.maskWindow) {
                this.wins.maskWindow.closeWindow();
            }
            // homeWin.webContents.send("dragsnip-saved", dragsnipPath);
        });
    };
}
