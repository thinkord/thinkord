import os from "os";
import * as path from "path";
import { BrowserWindow, screen } from "electron";
import { BaseWindow } from "./base-window";
import isDev from "electron-is-dev";
import { Factory } from "../ipc-manager/usage/factory";
import { UsageChannel } from "../ipc-manager/usage/usage-channel";

export class MaskWindow extends BaseWindow {
    private static win?: BrowserWindow | null;

    public createWindow(): void {
        const display = screen.getPrimaryDisplay();

        MaskWindow.win = new BrowserWindow({
            // window 使用 fullscreen,  mac 設置為 undefined, 不可為 false
            fullscreen: os.platform() === "win32" || undefined,
            width: display.bounds.width,
            height: display.bounds.height,
            x: display.bounds.x,
            y: display.bounds.y,
            transparent: true,
            frame: false,
            skipTaskbar: true,
            movable: false,
            resizable: false,
            enableLargerThanScreen: true,
            hasShadow: false,
            webPreferences: {
                contextIsolation: true,
                preload: path.resolve(__dirname, "preload.js"),
            },
            show: false,
        });

        MaskWindow.win.once("ready-to-show", () => {
            if (MaskWindow.win) MaskWindow.win.show();
        });
        MaskWindow.win.on("closed", () => {
            MaskWindow.win = null;
        });
        MaskWindow.win.setAlwaysOnTop(true, "screen-saver");
        MaskWindow.win.setVisibleOnAllWorkspaces(true);
        MaskWindow.win.setFullScreenable(false);

        // Load dragsnip.html via webpack dev server.
        MaskWindow.win.loadURL(
            isDev ? "http://localhost:3000/mask.html" : `file://${path.join(__dirname, "../build/mask.html")}`
        );

        const { x, y } = screen.getCursorScreenPoint();
        if (
            x >= display.bounds.x &&
            x <= display.bounds.x + display.bounds.width &&
            y >= display.bounds.y &&
            y <= display.bounds.y + display.bounds.height
        ) {
            MaskWindow.win.focus();
        } else {
            MaskWindow.win.blur();
        }

        // Debug
        MaskWindow.win.webContents.openDevTools();
    }

    public closeWindow(): void {
        MaskWindow.win?.close();
    }

    public register(): void {
        new UsageChannel(new Factory()).setMaskFactory().map((obj) => {
            obj.onRequest();
            // obj.onRequestOnce();
            // obj.handleRequest();
            // obj.handleRequestOnce();
            return obj;
        });
    }
}
