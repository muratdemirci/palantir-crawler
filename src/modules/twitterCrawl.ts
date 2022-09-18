import { logger } from "../logging/logger";
import { TOKENS } from "@config/dotenv";
import fs from "fs";
import path from "path";
import axios from "axios";

let accounts: any = fs.readFileSync(
  path.join(__dirname, "../files/accounts.txt")
);
accounts = accounts.toString().split("\n");

export const crawler = async (tokenCount: number, startTime:Date) => {
  const currentDate = new Date();
  let nextoken = '';  
  logger.info("lets crawl twitter");
  try {
    for (let index = 0; index < accounts.length; index++) {
      const element = accounts[index];
      let query = `(from:${element}) -giveaway -? -filter:retweets -filter:mentions`;
      const searchResult = (
        await axios.get(
          `https://api.twitter.com/2/tweets/search/recent?query=${query}&max_results=500&${nextoken}&start_time=${startTime.toISOString()}&end_time=${currentDate.toISOString()}&tweet.fields=author_id,created_at,id,text,public_metrics`,
          { headers: { Authorization: `Bearer ${TOKENS[tokenCount]}` } }
        )
      ).data;
    }
    return tokenCount;
  } catch (error) {
    logger.error(
      "upps! something wrong with crawler. let's try to change token and try again 5 minutes later!."
    );
    if (tokenCount < TOKENS.length - 1) {
      tokenCount += 1;
      return tokenCount;
    }
    console.log(error);
    return "out of Tokens";
  }
};
