import { Sequelize } from "sequelize";
import isDev from "electron-is-dev";

import { config } from "../config/config";
import { createUserModel } from "./user";
import { createFolderModel } from "./folder";
import { createCollectionModel } from "./collection";
import { createBlockModel } from "./block";
import { createFileModel } from "./file";
import { createBlockFileModel } from "./blockfile";

export type db = {
    [key: string]: any;
};

const db: db = {};

export const sequelize: Sequelize = isDev ? new Sequelize(config["development"]) : new Sequelize(config["production"]);

// Generate models
const User = createUserModel(sequelize);
const Folder = createFolderModel(sequelize);
const Collection = createCollectionModel(sequelize);
const Block = createBlockModel(sequelize);
const File = createFileModel(sequelize);
const BlockFile = createBlockFileModel(sequelize);

// Define associations between models
Folder.hasMany(Collection, { foreignKey: "folderId", as: "collections" });
Collection.belongsTo(Folder, { foreignKey: "folderId", as: "folders" });
Collection.hasMany(Block, { foreignKey: "collectionId", as: "blocks" });
Block.belongsTo(Collection, { foreignKey: "collectionId", as: "collection" });
Block.belongsToMany(File, { through: "BlockFile", foreignKey: "blockId", as: "files" });
File.belongsToMany(Block, { through: "BlockFile", foreignKey: "fileId", as: "blocks" });
BlockFile.belongsTo(Block, { foreignKey: "blockId" });
BlockFile.belongsTo(File, { foreignKey: "fileId" });

export class DBFactory {
    public static async create() {
        // Register all the models
        this.getModel();

        // Add the sequelize and Sequelize attributes
        db.sequelize = sequelize;
        db.Sequelize = Sequelize;

        return db;
    }

    private static async getModel() {
        db["User"] = User;
        db["Folder"] = Folder;
        db["Collection"] = Collection;
        db["Block"] = Block;
        db["File"] = File;
        db["BlockFile"] = BlockFile;
    }
}

export { User, Folder, Collection, Block, File, BlockFile };
