import { Sequelize } from 'sequelize';
import isDev from 'electron-is-dev'

import { config } from '../config/config';
import { UserFactory } from './user'
import { FolderFactory } from './folder'
import { CollectionFactory } from './collection'
import { BlockFactory } from './block'
import { FileFactory } from './file'
import { BlockFileFactory } from './blockfile'

export type db = {
  [key: string]: any
}

const db: db = {};

export const sequelize: Sequelize = isDev ? new Sequelize(config["development"]) : new Sequelize(config["production"])

// Generate models
export const User = UserFactory(sequelize)
export const Folder = FolderFactory(sequelize)
export const Collection = CollectionFactory(sequelize)
export const Block = BlockFactory(sequelize)
export const File = FileFactory(sequelize)
export const BlockFile = BlockFileFactory(sequelize)

// Define associations between models
Folder.hasMany(Collection, { foreignKey: 'folderId', as: 'collections' })
Collection.belongsTo(Folder, { foreignKey: 'folderId', as: 'folders' })
Collection.hasMany(Block, { foreignKey: 'collectionId', as: 'blocks' })
Block.belongsTo(Collection, { foreignKey: 'collectionId', as: 'collection' })
Block.belongsToMany(File, { through: 'BlockFile', foreignKey: 'blockId', as: 'files' })
File.belongsToMany(Block, { through: 'BlockFile', foreignKey: 'fileId', as: 'blocks' })
BlockFile.belongsTo(Block, { foreignKey: 'blockId' })
BlockFile.belongsTo(File, { foreignKey: 'fileId' })

export class DBFactory {
  public static async create() {
    // Register all the models
    this.getModel()

    // Add the sequelize and Sequelize attributes
    db.sequelize = sequelize
    db.Sequelize = Sequelize

    return db
  }

  private static async getModel() {
    db["User"] = User
    db["Folder"] = Folder
    db["Collection"] = Collection
    db["Block"] = Block
    db["File"] = File
    db["BlockFile"] = BlockFile
  }
}
