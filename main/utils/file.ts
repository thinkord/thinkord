import * as fs from "fs";
import * as path from "path";
import isDev from 'electron-is-dev'

export function loadFile(): Promise<string> {
    return new Promise((resolve, reject) => {
        let p = isDev ? `./public/real-dev-data.json` : path.join(__dirname, '../build/real-dev-data.json')
        fs.readFile(p, function (err: NodeJS.ErrnoException | null, data: Buffer) {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
}