import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export interface CollectionAttributes {
    id?: number;
    name: string;
    display?: boolean;
    bookmark?: boolean;
    folderId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CollectionModel extends Model<CollectionAttributes>, CollectionAttributes {
    // At the moment, there's nothing more to add apart
    // from the methods and attributes that the types
    // `Model<CollectionAttributes>` and
    // `CollectionAttributes` give us. We'll add more here when
    //  we get on to adding associations.
}

export class Collection extends Model<CollectionModel, CollectionAttributes> {}
export type CollectionStatic = typeof Model & {
    // eslint-disable-next-line @typescript-eslint/ban-types
    new (values?: object, options?: BuildOptions): CollectionModel;
};

export function createCollectionModel(sequelize: Sequelize): CollectionStatic {
    return sequelize.define("Collection", {
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
        display: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
        bookmark: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
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
    }) as CollectionStatic;
}
