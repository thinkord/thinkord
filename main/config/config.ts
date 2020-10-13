import * as path from 'path';
import { Options } from "sequelize";
let workpath = process.env.HOME + '//AppData//Roaming//thinkord'

const config = {
  "development": {
    dialect: "sqlite",
    storage: "main/db.sqlite3"
  } as Options,
  "test": {
    dialect: "sqlite",
    storage: 'main/db_test.sqlite3'
  } as Options,
  "production": {
    dialect: "sqlite",
    storage: path.join(workpath, '/db_prd.sqlite3')
  } as Options
}

export { config }