import {
    Sequelize,
    Model,
    DataTypes,
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
import { Block } from "./block";

interface FileAttributes {
    id?: number;
    name: string;
    path: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class File extends Model<FileAttributes> implements FileAttributes {
    public id!: number;
    public name!: string;
    public path!: string;
    public readonly createdAt!: Date;
    public updatedAt!: Date;

    public createBlock!: BelongsToManyCreateAssociationMixin<Block>;
    public addBlock!: BelongsToManyAddAssociationMixin<Block, Block["id"]>;
    public addBlocks!: BelongsToManyAddAssociationsMixin<Block, Block["id"]>;
    public getBlocks!: BelongsToManyGetAssociationsMixin<Block>;
    public countBlocks!: BelongsToManyCountAssociationsMixin;
    public hasBlock!: BelongsToManyHasAssociationMixin<Block, Block["id"]>;
    public hasBlocks!: BelongsToManyHasAssociationsMixin<Block, Block["id"]>;
    public setBlocks!: BelongsToManySetAssociationsMixin<Block, Block["id"]>;
    public removeBlock!: BelongsToManyRemoveAssociationMixin<Block, Block["id"]>;
    public removeBlocks!: BelongsToManyRemoveAssociationsMixin<Block, Block["id"]>;

    public static associations: {
        blocks: Association<File, Block>;
    };
}

const initFileModel = (sequelize: Sequelize) => {
    File.init(
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
        },
        {
            sequelize,
            modelName: "File",
        }
    );

    return File;
};

export { File, initFileModel };
