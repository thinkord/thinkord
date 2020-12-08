import { Sequelize, Model, DataTypes } from "sequelize";
import { Block } from "./block";
import { File } from "./file";

export interface BlockFileAttributes {
    blockId: number;
    fileId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

class BlockFile extends Model<BlockFileAttributes> implements BlockFileAttributes {
    public blockId!: number;
    public fileId!: number;
    public readonly createdAt!: Date;
    public updatedAt!: Date;
}

const initBlockFileModel = (sequelize: Sequelize) => {
    BlockFile.init(
        {
            blockId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            fileId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
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
        },
        {
            sequelize,
            modelName: "BlockFile",
        }
    );

    return BlockFile;
};

export { BlockFile, initBlockFileModel };
