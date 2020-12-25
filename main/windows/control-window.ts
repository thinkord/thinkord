import { BrowserWindow } from "electron";
import { BaseWindow } from "./base-window";
import isDev from "electron-is-dev";
import path from "path";
import { Factory } from "../ipc-manager/usage/factory";
import { UsageChannel } from "../ipc-manager/usage/usage-channel";

export class ControlWindow extends BaseWindow {
    private static win?: BrowserWindow | null;
    private static count = 0;
    public createWindow(): void {
        ControlWindow.win = new BrowserWindow({
            frame: false,
            width: 400,
            height: 100,
            webPreferences: {
                contextIsolation: true,
                preload: path.resolve(__dirname, "preload.js"),
            },
        });

        ControlWindow.win.loadURL(
            isDev
                ? "http://localhost:3000/#/controlbar"
                : `file://${path.join(__dirname, "../build/index.html#controlbar")}`
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
