import { DataTypes, Model, ModelAttributes, DATE } from "sequelize";

export interface TweetModel extends Model {
  tweetID: string;
  text: string;
  tweet_created: Date;
  userId: number;
}

export const TweetSchema: ModelAttributes = {
  tweetID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
    unique:true,
  },
  text: { type: DataTypes.STRING, allowNull: false },
  tweet_created: { type: DATE, allowNull: false },
  userId: { type: DataTypes.INTEGER },
  rtCount: { type: DataTypes.INTEGER },
  qtCount: { type: DataTypes.INTEGER },
  likeCount: { type: DataTypes.INTEGER },
  rpCount: { type: DataTypes.INTEGER },
};
