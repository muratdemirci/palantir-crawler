import fs from "fs";
import path from "path";
import { User } from "@config/database";
import { logger } from "@logging/logger";

export const AccSync = async () => {
  let accounts: any = fs.readFileSync(
    path.join(__dirname, "../files/accounts.txt")
  );
  accounts = accounts.toString().split("\n");

  for (let index = 0; index < accounts.length; index++) {
    const element = accounts[index];
    try {
        User.create({username:element})
    } catch (error) {
      logger.error(error);
      logger.error(`Looks like this account is exist: ${element}`);
    }
  }
  logger.info('Accounts synchronized')
};
