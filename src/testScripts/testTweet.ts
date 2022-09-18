import { logger } from "../logging/logger";
import { DAILY_MS, TOKENS } from "@config/dotenv";
import fs from "fs";
import path from "path";
import axios from "axios";

let accounts: any = fs.readFileSync(
  path.join(__dirname, "../files/accounts.txt")
);
accounts = accounts.toString().split("\n");

const testThisShit = async (tokenCount: number, startTime: Date) => {
  const currentDate = new Date();
  let now_utc = Date.UTC(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate(),
    currentDate.getUTCHours(),
    currentDate.getUTCMinutes(),
    currentDate.getUTCSeconds()
  );
  let URI = "";
  let query = "";
  let nextoken = "";
  //&start_time=${startTime.toISOString()}&end_time=${currentDate.toISOString()}
  logger.info("lets crawl twitter");
  try {
    let tweetBody = []
    for (let index = 0; index < accounts.length; index++) {
      const element = accounts[index];
      query = `from:${element.replace("\r", "")}`;
      URI = `https://api.twitter.com/2/tweets/search/recent?query=${query}&max_results=100&&tweet.fields=author_id,created_at,id,text,public_metrics`;
      const searchResult = (
        await axios.get(URI, {
          headers: { Authorization: `Bearer ${TOKENS[tokenCount]}` },
        })
      ).data.data;
      tweetBody.push(searchResult)
    }
    fs.appendFileSync(
      "./example-data-output.json",
      JSON.stringify(tweetBody),
      "utf-8"
    );
    return tokenCount;
  } catch (error) {
    console.log(error);
    logger.error(
      "upps! something wrong with crawler. let's try to change token and try again 5 minutes later!."
    );
    // if (tokenCount < TOKENS.length - 1) {
    //   tokenCount += 1;
    //   return tokenCount;
    // }
    return "out of Tokens";
  }
};

const main = async () => {
  const currentDate: Date = new Date();
  let daysAgo = currentDate.getTime() - DAILY_MS * 90;
  let result = await testThisShit(0, new Date(daysAgo));
};

main();
