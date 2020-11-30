import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export interface FolderAttributes {
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FolderModel extends Model<FolderAttributes>, FolderAttributes {
    // At the moment, there's nothing more to add apart
    // from the methods and attributes that the types
    // `Model<FolderAttributes>` and
    // `FolderAttributes` give us. We'll add more here when
    //  we get on to adding associations.
}

export class Folder extends Model<FolderModel, FolderAttributes> {}
export type FolderStatic = typeof Model & {
    // eslint-disable-next-line @typescript-eslint/ban-types
    new (values?: object, options?: BuildOptions): FolderModel;
};

export function createFolderModel(sequelize: Sequelize): FolderStatic {
    return sequelize.define("Folder", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
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
    }) as FolderStatic;
}
