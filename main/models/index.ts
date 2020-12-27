import { Sequelize } from "sequelize";
import isDev from "electron-is-dev";

import { config } from "../config/config";
import { initUserModel } from "./user";
import { initFolderModel } from "./folder";
import { initCollectionModel } from "./collection";
import { initBlockModel } from "./block";
import { initFileModel } from "./file";
import { initBlockFileModel } from "./blockfile";

const sequelize: Sequelize = isDev ? new Sequelize(config["development"]) : new Sequelize(config["production"]);

// Generate models
const User = initUserModel(sequelize);
const Folder = initFolderModel(sequelize);
const Collection = initCollectionModel(sequelize);
const Block = initBlockModel(sequelize);
const File = initFileModel(sequelize);
const BlockFile = initBlockFileModel(sequelize);

// Called association methods after initialization
Folder.hasMany(Collection, { foreignKey: "folderId", as: "collections" });
Collection.belongsTo(Folder, { foreignKey: "folderId", as: "folders" });
Collection.hasMany(Block, { foreignKey: "collectionId", as: "blocks" });
Block.belongsTo(Collection, { foreignKey: "collectionId", as: "collection" });
Block.belongsToMany(File, { through: "BlockFile", foreignKey: "blockId", as: "files" });
File.belongsToMany(Block, { through: "BlockFile", foreignKey: "fileId", as: "blocks" });
BlockFile.belongsTo(Block, { foreignKey: "blockId" });
BlockFile.belongsTo(File, { foreignKey: "fileId" });

export { sequelize, User, Folder, Collection, Block, File, BlockFile };
