
import * as path from 'path';

let workpath = process.env.HOME + '//AppData//Roaming//thinkord'

const config = {
  "development": {
    "dialect": "sqlite",
    "storage": "main/db.sqlite3",
    "operatorsAliases": false
  },
  "test": {
    "dialect": "sqlite",
    "storage": 'main/db_tst.sqlite3',
    "operatorsAliases": false
  },
  "production": {
    "dialect": "sqlite",
    "storage": path.join(workpath, '/db_prd.sqlite3'),
    "operatorsAliases": false
  }
}

export { config }