import {
    Sequelize,
    Model,
    DataTypes,
    HasManyCreateAssociationMixin,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin,
    HasManyHasAssociationsMixin,
    HasManyCountAssociationsMixin,
    HasManySetAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin,
    Association,
} from "sequelize";
import { Collection } from "./collection";

interface FolderAttributes {
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class Folder extends Model<FolderAttributes> implements FolderAttributes {
    public id!: number;
    public name!: string;
    public readonly createdAt!: Date;
    public updatedAt!: Date;

    public createCollection!: HasManyCreateAssociationMixin<Collection>;
    public addCollection!: HasManyAddAssociationsMixin<Collection, Collection["id"]>;
    public addCollections!: HasManyAddAssociationMixin<Collection, Collection["id"]>;
    public getCollections!: HasManyGetAssociationsMixin<Collection>;
    public countCollections!: HasManyCountAssociationsMixin;
    public hasCollection!: HasManyHasAssociationMixin<Collection, Collection["id"]>;
    public hasCollections!: HasManyHasAssociationsMixin<Collection, Collection["id"]>;
    public setCollections!: HasManySetAssociationsMixin<Collection, Collection["id"]>;
    public removeCollection!: HasManyRemoveAssociationMixin<Collection, Collection["id"]>;
    public removeCollections!: HasManyRemoveAssociationsMixin<Collection, Collection["id"]>;

    public static associations: {
        collections: Association<Folder, Collection>;
    };
}

const initFolderModel = (sequelize: Sequelize) => {
    Folder.init(
        {
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
        },
        {
            sequelize,
            modelName: "Folder",
        }
    );

    return Folder;
};

export { Folder, initFolderModel };
