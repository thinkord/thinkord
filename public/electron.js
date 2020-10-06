/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main/electron.ts":
/*!**************************!*\
  !*** ./main/electron.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __webpack_require__(/*! electron */ "electron");
const path = __importStar(__webpack_require__(/*! path */ "path"));
// import db from "./models/index"
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const electron_is_dev_1 = __importDefault(__webpack_require__(/*! electron-is-dev */ "./node_modules/electron-is-dev/index.js"));
const FileChannel_1 = __webpack_require__(/*! ./ipc/FileChannel */ "./main/ipc/FileChannel.ts");
class Main {
    init(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            const sequelize = new sequelize_1.Sequelize({
                dialect: 'sqlite',
                storage: 'main/db.sqlite3'
            });
            electron_1.app.on('ready', this.createWindow);
            electron_1.app.on('window-all-closed', this.onWindowAllClosed);
            electron_1.app.on('activate', this.onActivate);
            try {
                yield sequelize.authenticate();
                console.log('Connection has been established successfully.');
            }
            catch (error) {
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
        });
    }
    onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    }
    onActivate() {
        if (!this.win) {
            this.createWindow();
        }
    }
    createWindow() {
        this.win = new electron_1.BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                // enableRemoteModule: true,
                contextIsolation: true,
                preload: path.resolve(__dirname, 'preload.js')
            }
        });
        this.win.loadURL(electron_is_dev_1.default ? "http://localhost:3000" : `file://${path.join(__dirname, '../build/index.html')}`);
        this.win.once('ready-to-show', () => {
            if (this.win)
                this.win.show();
        });
        this.win.on('closed', () => {
            this.win = null;
        });
    }
}
(new Main()).init([
    new FileChannel_1.FileChannel('fileprocess')
]);


/***/ }),

/***/ "./main/ipc/FileChannel.ts":
/*!*********************************!*\
  !*** ./main/ipc/FileChannel.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileChannel = void 0;
const electron_1 = __webpack_require__(/*! electron */ "electron");
const file_1 = __webpack_require__(/*! ../utils/file */ "./main/utils/file.ts");
class FileChannel {
    constructor(channelName) {
        this.channelName = channelName;
        electron_1.ipcMain.on(this.channelName, (event, command, args) => {
            switch (command) {
                case 'save':
                case 'delete':
                case 'load':
                    this[command](event, args);
                    break;
                default:
                    console.log('There is no command in thic channel');
                    break;
            }
        });
    }
    save(event, args) {
        console.log(args);
        event.reply('fuck', 'u');
    }
    load(event, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield file_1.loadFile();
            event.reply('loadComplete', data);
        });
    }
    delete(event, args) {
        console.log(args);
    }
}
exports.FileChannel = FileChannel;


/***/ }),

/***/ "./main/utils/file.ts":
/*!****************************!*\
  !*** ./main/utils/file.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFile = void 0;
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const electron_is_dev_1 = __importDefault(__webpack_require__(/*! electron-is-dev */ "./node_modules/electron-is-dev/index.js"));
function loadFile() {
    return new Promise((resolve, reject) => {
        let p = electron_is_dev_1.default ? `./public/real-dev-data.json` : path.join(__dirname, '../build/real-dev-data.json');
        fs.readFile(p, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.toString());
            }
        });
    });
}
exports.loadFile = loadFile;


/***/ }),

/***/ "./node_modules/electron-is-dev/index.js":
/*!***********************************************!*\
  !*** ./node_modules/electron-is-dev/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const electron = __webpack_require__(/*! electron */ "electron");

if (typeof electron === 'string') {
	throw new TypeError('Not running in an Electron environment!');
}

const app = electron.app || electron.remote.app;

const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;

module.exports = isEnvSet ? getFromEnv : !app.isPackaged;


/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./main/electron.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./main/electron.ts */"./main/electron.ts");


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "sequelize":
/*!***************************************!*\
  !*** external "require('sequelize')" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('sequelize');

/***/ })

/******/ });
//# sourceMappingURL=electron.js.map