import { scheduleJob } from "node-schedule";
import { logger } from "@logging/logger";
import { crawler } from "@modules/twitterCrawl";
import { AccSync } from "@modules/syncAccounts";
import { syncDate } from "@config/database";
import { DAILY_MS } from "@config/dotenv";


const main = async () => {
  try {
    let tokenCount = 0;
    await AccSync();
    const syncCheck = await syncDate.findAll();
    const currentDate:Date = new Date;
    
    if (syncCheck.length <1) {
      let daysAgo = currentDate.getTime()-(DAILY_MS*90);
      let result = await crawler(tokenCount,new Date(daysAgo));
      if (typeof result === "number") {
        tokenCount = result;
      } 
    }

    
    logger.info("schedule started");
    scheduleJob("*/5 * * * *", async () => {
      let result = await crawler(tokenCount,syncCheck[0].lastSync);
      if (typeof result === "number") {
        tokenCount = result;
      } 
    });
  } catch (error) {
    console.log(error);
  }
};

main();
