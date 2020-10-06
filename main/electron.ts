import { app, BrowserWindow } from "electron";
import * as path from "path";
// import db from "./models/index"
import { Sequelize } from 'sequelize';
import isDev from 'electron-is-dev'

import { IIpcChannel } from "./ipc/IIpcChannel";
import { FileChannel } from "./ipc/FileChannel";

class Main {
    private win?: BrowserWindow | null

    public async init(channel: IIpcChannel[]) {
        const sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'main/db.sqlite3'
        })

        app.on('ready', this.createWindow)
        app.on('window-all-closed', this.onWindowAllClosed)
        app.on('activate', this.onActivate)

        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
        // db.sequelize
        //     .sync({ force: true })
        //     .then(() => {
        //         db.Folder.create({ name: 'Martin' })
        //             .then(() => {
        //                 console.log('Folder created.')
        //             })
        //             .catch((error) => {
        //                 console.error(error)
        //             })
        //         db.Folder.create({ name: 'Tim' })
        //             .then(() => {
        //                 console.log('Folder created.')
        //             })
        //             .catch((error) => {
        //                 console.error(error)
        //             })
        //     })
        //     .then(() => {
        //         db.Collection.create({
        //             name: 'test',
        //             display: true,
        //             folderId: 1
        //         })
        //             .then(() => {
        //                 console.log('Collection created.')
        //             })
        //             .catch((error) => {
        //                 console.error(error)
        //             })
        //     })
        //     .then(() => {
        //         db.Collection.create({
        //             name: 'test',
        //             display: true,
        //             folderId: 2
        //         })
        //             .then(() => {
        //                 console.log('Collection created.')
        //             })
        //             .catch((error) => {
        //                 console.error(error)
        //             })
        //     })
        //     .then(() => {
        //         db.Block.create({
        //             title: 'test',
        //             type: 'image',
        //             description: 'this is test image',
        //             bookmark: true,
        //             collectionId: 1
        //         })
        //             .then(() => {
        //                 console.log('Block created.')
        //             })
        //             .catch((error) => {
        //                 console.error(error)
        //             })
        //     })
        //     .then(async () => {
        //         let query = await db.Folder.findAll({
        //             include: { all: true, nested: true }
        //         })

        //         console.log(JSON.stringify(query, null, 2))
        //     })
        //     .catch((error) => {
        //         console.error('Unable to connect to the database:', error);
        //     })
    }

    private onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }
    private onActivate() {
        if (!this.win) {
            this.createWindow()
        }
    }

    private createWindow() {
        this.win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                // enableRemoteModule: true,
                contextIsolation: true,
                preload: path.resolve(__dirname, 'preload.js')
            }
        });

        this.win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, '../build/index.html')}`)
        this.win.once('ready-to-show', () => {
            if (this.win) this.win.show()
        })
        this.win.on('closed', () => {
            this.win = null
        })
    }
}

(new Main()).init([
    new FileChannel('fileprocess')
])
