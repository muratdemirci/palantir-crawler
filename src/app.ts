import { scheduleJob } from "node-schedule";
import { logger } from "@logging/logger";
import { crawler } from "@modules/twitterCrawl"


try {
  logger.info("schedule started");
  scheduleJob("*/5 * * * *", function () {
    logger.info("schedule started2");
    crawler();
  });
} catch (error) {
    console.log(error)
}
