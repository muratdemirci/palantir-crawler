import { logger } from "@logging/logger";
import { Sequelize, ModelOptions } from "sequelize";
import { DB_NAME, DB_HOST, DB_PASS, DB_USER } from "@config/dotenv";
import { DateModel, DateSchema } from "src/models/syncDate";
import { UserModel, UserSchema } from "src/models/User";
import { TweetModel, TweetSchema } from "src/models/tweets";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
});

const ModelOption: ModelOptions = { freezeTableName: true };

export const User = sequelize.define<UserModel>(
  "User",
  UserSchema,
  ModelOption
);
export const syncDate = sequelize.define<DateModel>(
  "syncDate",
  DateSchema,
  ModelOption
);
export const Tweet = sequelize.define<TweetModel>(
  "Tweet",
  TweetSchema,
  ModelOption
);

User.hasMany(Tweet, { sourceKey: "userId", foreignKey: "userId" });
Tweet.belongsTo(User, { foreignKey: "userId" });

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Connection has been established successfully.");
    await sequelize.sync({ alter: true });
  } catch (error) {
    logger.error(`Unable to connect to the database: ${error}`);
  }
};

initializeDatabase();

export default sequelize;
