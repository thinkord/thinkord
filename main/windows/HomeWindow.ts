import { BrowserWindow } from "electron";
import { BaseWindow } from "./BaseWindow";
import * as path from "path";
import isDev from "electron-is-dev";
import { IIpcChannel } from "../ipc/IIpcChannel";
import { HomeFactory } from "../ipc-manager/usage/HomeFactory";
import { UsageChannel } from "../ipc-manager/usage/UsageChannel";
export class HomeWindow extends BaseWindow {
    private static win?: BrowserWindow | null;

    public createWindow(channel: IIpcChannel[]): void {
        HomeWindow.win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                // enableRemoteModule: true,
                contextIsolation: true,
                preload: path.resolve(__dirname, "preload.js"),
            },
        });

        HomeWindow.win.loadURL(
            isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
        );
        HomeWindow.win.once("ready-to-show", () => {
            if (HomeWindow.win) {
                HomeWindow.win.show();
            }
        });
        HomeWindow.win.on("closed", () => {
            HomeWindow.win = null;
        });
    }

    public register(): void {
        new UsageChannel(new HomeFactory()).setHomeChannel().map((obj) => {
            obj.handleRequest();
            obj.handleRequestOnce();
            return obj;
        });
    }
}
