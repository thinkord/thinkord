import {
    Sequelize,
    Model,
    DataTypes,
    BelongsToCreateAssociationMixin,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyHasAssociationsMixin,
    BelongsToManySetAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    Association,
} from "sequelize";
import { Collection } from "./collection";
import { File } from "./file";

interface BlockAttributes {
    id?: number;
    title: string;
    type: string;
    description?: string;
    bookmark?: boolean;
    collectionId: number; // Should add it later
    createdAt?: Date;
    updatedAt?: Date;
}

class Block extends Model<BlockAttributes> implements BlockAttributes {
    public id!: number;
    public title!: string;
    public type!: string;
    public description!: string;
    public bookmark!: boolean;
    public collectionId!: number; // Should add it later
    public readonly createdAt!: Date;
    public updatedAt!: Date;

    // Collection mixin methods
    public createCollection!: BelongsToCreateAssociationMixin<Collection>;
    public getCollection!: BelongsToGetAssociationMixin<Collection>;
    public setCollection!: BelongsToSetAssociationMixin<Collection, Collection["id"]>;

    // File mixin methods
    public createFile!: BelongsToManyCreateAssociationMixin<File>;
    public addFile!: BelongsToManyAddAssociationMixin<File, File["id"]>;
    public addFiles!: BelongsToManyAddAssociationsMixin<File, File["id"]>;
    public getFiles!: BelongsToManyGetAssociationsMixin<File>;
    public countFiles!: BelongsToManyCountAssociationsMixin;
    public hasFile!: BelongsToManyHasAssociationMixin<File, File["id"]>;
    public hasFiles!: BelongsToManyHasAssociationsMixin<File, File["id"]>;
    public setFiles!: BelongsToManySetAssociationsMixin<File, File["id"]>;
    public removeFile!: BelongsToManyRemoveAssociationMixin<File, File["id"]>;
    public removeFiles!: BelongsToManyRemoveAssociationsMixin<File, File["id"]>;

    public static associations: {
        files: Association<Block, File>;
    };
}

const initBlockModel = (sequelize: Sequelize) => {
    Block.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM,
                values: ["text", "image", "audio", "video"],
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
            },
            bookmark: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            // Should add it later
            collectionId: {
                type: DataTypes.INTEGER,
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
            modelName: "Block",
        }
    );

    return Block;
};

export { Block, initBlockModel };
