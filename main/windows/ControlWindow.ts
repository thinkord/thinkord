import { BrowserWindow, ipcMain } from "electron";
import { BaseWindow } from "./BaseWindow";
import isDev from "electron-is-dev";
import path from "path";
import { Factory } from "../ipc-manager/usage/Factory";
import { UsageChannel } from "../ipc-manager/usage/UsageChannel";

export class ControlWindow extends BaseWindow {
    private static win?: BrowserWindow | null;
    private static count = 0;
    public createWindow(): void {
        ControlWindow.win = new BrowserWindow({
            frame: false,
            width: 400,
            height: 100,
            webPreferences: {
                enableRemoteModule: true,
                nodeIntegration: true,
            },
        });

        ControlWindow.win.loadURL(
            isDev
                ? "http://localhost:3000/controlbar.html"
                : `file://${path.join(__dirname, "../build/controlbar.html")}`
        );

        ControlWindow.win.once("ready-to-show", () => {
            if (ControlWindow.win) {
                ControlWindow.win.show();
            }
        });

        ControlWindow.win.once("close", () => {
            ControlWindow.win = null;
        });
    }

    public closeWindow(): void {
        ControlWindow.win?.close();
    }
    public register(): void {
        /**Solve repeat ipcMain register */
        // if (ControlWindow.count < 1) {
        //     new UsageChannel(new Factory()).setControlFactory().map((obj) => {
        //         obj.handleRequest();
        //         obj.handleRequestOnce();
        //         return obj;
        //     });
        //     ControlWindow.count++;
        // }

        const usage = new UsageChannel(new Factory());
        usage.setControlFactory().map((obj) => {
            obj.handleRequest();
            obj.handleRequestOnce();
            return obj;
        });
    }
}
