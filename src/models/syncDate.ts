import { DataTypes, Model, ModelAttributes, DATE } from "sequelize";

export interface DateModel extends Model {
  oldestData: Date;
  lastSync: Date;
}

export const DateSchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  oldestData: { type: DATE, allowNull: true },
  lastSync: { type: DATE, allowNull: true },
};
