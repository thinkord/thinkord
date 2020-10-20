import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export interface BlockAttributes {
    id: number;
    title: string;
    type: string;
    description?: string;
    bookmark: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface BlockModel extends Model<BlockAttributes>, BlockAttributes {
    // At the moment, there's nothing more to add apart
    // from the methods and attributes that the types
    // `Model<BlockAttributes>` and
    // `BlockAttributes` give us. We'll add more here when
    //  we get on to adding associations.
};

export class Block extends Model<BlockModel, BlockAttributes> { }
export type BlockStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): BlockModel;
};

export function createBlockModel(sequelize: Sequelize): BlockStatic {
    return sequelize.define("Block", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM,
            values: ['text', 'image', 'audio', 'video'],
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        bookmark: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
    }) as BlockStatic
}
