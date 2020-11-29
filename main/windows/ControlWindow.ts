import { BrowserWindow } from "electron";
import { BaseWindow } from "./BaseWindow";
import isDev from "electron-is-dev";
import path from "path";
import { IIpcChannel } from "../ipc/IIpcChannel";

export class ControlWindow extends BaseWindow {
    private static win?: BrowserWindow | null;

    public createWindow(channel: IIpcChannel[]): void {
        ControlWindow.win = new BrowserWindow({
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
}
