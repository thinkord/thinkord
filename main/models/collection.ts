import {
    Sequelize,
    Model,
    DataTypes,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToGetAssociationMixin,
    HasManyCreateAssociationMixin,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManyGetAssociationsMixin,
    HasManyCountAssociationsMixin,
    HasManyHasAssociationMixin,
    HasManyHasAssociationsMixin,
    HasManySetAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin,
    Association,
    Optional,
} from "sequelize";
import { Folder } from "./folder";
import { Block } from "./block";

interface CollectionAttributes {
    id?: number;
    name: string;
    display?: boolean;
    bookmark?: boolean;
    folderId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
class Collection extends Model<CollectionAttributes> implements CollectionAttributes {
    public id!: number;
    public name!: string;
    public display!: boolean;
    public bookmark!: boolean;
    public folderId!: number;
    public readonly createdAt!: Date;
    public updatedAt!: Date;

    // Folder mixin methods
    public createFolder!: BelongsToCreateAssociationMixin<Folder>;
    public getFolder!: BelongsToGetAssociationMixin<Folder>;
    public setFolder!: BelongsToSetAssociationMixin<Folder, Folder["id"]>;

    // Block mixin methods
    public createBlock!: HasManyCreateAssociationMixin<Block>;
    public addBlock!: HasManyAddAssociationsMixin<Block, Block["id"]>;
    public addBlocks!: HasManyAddAssociationMixin<Block, Block["id"]>;
    public getBlocks!: HasManyGetAssociationsMixin<Block>;
    public countBlocks!: HasManyCountAssociationsMixin;
    public hasBlock!: HasManyHasAssociationMixin<Block, Block["id"]>;
    public hasBlocks!: HasManyHasAssociationsMixin<Block, Block["id"]>;
    public setBlocks!: HasManySetAssociationsMixin<Block, Block["id"]>;
    public removeBlock!: HasManyRemoveAssociationMixin<Block, Block["id"]>;
    public removeBlocks!: HasManyRemoveAssociationsMixin<Block, Block["id"]>;

    public static associations: {
        folders: Association<Collection, Folder>;
        blocks: Association<Collection, Block>;
    };
}

const initCollectionModel = (sequelize: Sequelize) => {
    Collection.init(
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
        },
        {
            sequelize,
            modelName: "Collection",
        }
    );

    return Collection;
};

export { Collection, initCollectionModel };
