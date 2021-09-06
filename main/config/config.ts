import * as path from "path";
import { app } from "electron";
import { Options } from "sequelize";

// const workpath = process.env.HOME + "//AppData//Roaming//thinkord";
const userPath = app.getPath("userData");

const config = {
    development: {
        dialect: "sqlite",
        storage: "main/db.sqlite3",
    } as Options,
    test: {
        dialect: "sqlite",
        storage: "main/db_test.sqlite3",
    } as Options,
    production: {
        dialect: "sqlite",
        storage: path.join(userPath, "/db_prd.sqlite3"),
    } as Options,
};

export { config };
