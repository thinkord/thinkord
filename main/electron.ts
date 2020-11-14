import * as path from "path";
import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import log from "loglevel";
import { DBFactory } from "./models/index";
import { IIpcChannel } from "./ipc/IIpcChannel";
import { FileChannel } from "./ipc/FileChannel";
import { HomeChannel } from "./ipc/HomeChannel";
import { SystemChannel } from "./ipc/SystemChannel";

log.setLevel("info");

class Main {
    private win?: BrowserWindow | null;

    public async init(channel: IIpcChannel[]) {
        app.on("ready", this.createWindow);
        app.on("window-all-closed", this.onWindowAllClosed);
        app.on("activate", this.onActivate);

        const db = await DBFactory.create();

        db.sequelize
            .sync({ force: false })
            .then(() => {
                log.info(`Connect to sqlite succesfully`);
            })
            .catch((err: any) => {
                log.error(err);
            });
    }

    private onWindowAllClosed() {
        if (process.platform !== "darwin") {
            app.quit();
        }
    }
    private onActivate() {
        if (!this.win) {
            this.createWindow();
        }
    }

    private createWindow() {
        this.win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: false,
                contextIsolation: true,
                preload: path.resolve(__dirname, "preload.js"),
            },
        });
        this.win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
        this.win.once("ready-to-show", () => {
            if (this.win) this.win.show();
        });
        this.win.on("closed", () => {
            this.win = null;
        });
    }
}

new Main().init([new FileChannel("fileprocess"), new HomeChannel("homeprocess"), new SystemChannel("systemprocess")]);
