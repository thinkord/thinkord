import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export interface FileAttributes {
    id: number;
    name: string;
    path: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface FileModel extends Model<FileAttributes>, FileAttributes {
    // At the moment, there's nothing more to add apart
    // from the methods and attributes that the types
    // `Model<FileAttributes>` and
    // `FileAttributes` give us. We'll add more here when
    //  we get on to adding associations.
};

export class File extends Model<FileModel, FileAttributes> { }
export type FileStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): FileModel;
};

export function FileFactory(sequelize: Sequelize): FileStatic {
    return sequelize.define("File", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        path: {
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
    }) as FileStatic
}
