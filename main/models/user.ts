import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {
    // At the moment, there's nothing more to add apart
    // from the methods and attributes that the types
    // `Model<UserAttributes>` and
    // `UserAttributes` give us. We'll add more here when
    //  we get on to adding associations.
}

export class User extends Model<UserModel, UserAttributes> {}
export type UserStatic = typeof Model & {
    // eslint-disable-next-line @typescript-eslint/ban-types
    new (values?: object, options?: BuildOptions): UserModel;
};

export function createUserModel(sequelize: Sequelize): UserStatic {
    return sequelize.define("User", {
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordConfirm: {
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
    }) as UserStatic;
}
