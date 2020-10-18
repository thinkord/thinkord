import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export interface BlockFileAttributes {
    blockId: number;
    fileId: number;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface BlockFileModel extends Model<BlockFileAttributes>, BlockFileAttributes {
    // At the moment, there's nothing more to add apart
    // from the methods and attributes that the types
    // `Model<BlockFileAttributes>` and
    // `BlockFileAttributes` give us. We'll add more here when
    //  we get on to adding associations.
};

export class BlockFile extends Model<BlockFileModel, BlockFileAttributes> { }
export type BlockFileStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): BlockFileModel;
};

export function createBlockFileModel(sequelize: Sequelize): BlockFileStatic {
    return sequelize.define("BlockFile", {
        blockId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        fildId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }) as BlockFileStatic
}
