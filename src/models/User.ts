import { DataTypes, Model, ModelAttributes, DATE } from "sequelize";

export interface UserModel extends Model {
  userId: number;
  username: string;
  last_synced: Date;
}

export const UserSchema: ModelAttributes = {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: { type: DataTypes.STRING, allowNull: false,unique: true },
  last_synced: { type: DATE, allowNull: true },
};
