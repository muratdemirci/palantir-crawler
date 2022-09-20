# palantir twitter Crawler

Twitter crawler service for palantir sentiment analysis project. Its communicating palantir's [main API](#https://github.com/muratdemirci/palantir-be)

## Libraries and tools used

- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Winston](https://github.com/winstonjs/winston)
- [Twitter API SDK](https://www.npmjs.com/package/twitter-api-sdk)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [node-schedule](https://www.npmjs.com/package/node-schedule)
- [axios](https://www.npmjs.com/package/axios)
## Table of content

- [Installation](#installation)
- [Quickstart](#quickstart)   
- [More Examples](#more-examples)
- [Configuration Details](#configuration-details)
- [License](#license)

## Installation

install dependencies
```npm install```
### Build and run
```npm start```
## Quickstart
Scraps last 500 tweet(this is the api's limit) from startTime to current date time.
```Typescript 
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
```

## More Examples
- [twitter-crawler](https://github.com/ferencberes/twitter-crawler): twittercrawler is a simple Python crawler on top of the popular Twython package.
- [Crawl Twitter Data using 30 Lines of Python Code](https://chatbotslife.com/crawl-twitter-data-using-30-lines-of-python-code-e3fece99450e): On text analysis which using twitter data, crawling is a crucial thing to do. There are many ways for us to do that; to crawl twitter data, we can use official twitter API and many programming languages.
- [Data Crawling with Twitter API](https://pnut2357.github.io/Data-Crawling-TwitterAPI/): In the earlier post, I briefly introduced about how API and web work. In this post, let me talk about the practical usage of API: data crawling using Twitter API.

## Configuration Details
fill .env file with your configs;
```
BEARER_TOKENS = "twitter bearer tokens splitted with ','"
DB_USER=mordoridmanyurdu
DB_HOST=localhost
DB_NAME=palantir
DB_PASSWORD=123456
DB_PORT=5432
MS_FROM_NOW = 7776000000
DAILY_MS = 86400000
```
### Crawl depth
By default there is no limit on the depth of crawling. But you can limit the depth of crawling. For example, assume that you have a seed page "A", which links to "B", which links to "C", which links to "D". So, we have the following link structure:

A -> B -> C -> D

Since, "A" is a seed page, it will have a depth of 0. "B" will have depth of 1 and so on. You can set a limit on the depth of pages that crawler4j crawls. For example, if you set this limit to 2, it won't crawl page "D". We're using 0 depth.

### Maximum number of users to crawl

We're counting the accounts so we can use them for our process.

```Typescript 
let accounts: any = fs.readFileSync(
  path.join(__dirname, "../files/accounts.txt")
);
accounts = accounts.toString().split("\n");
```

### Politeness
We're filtering spam tweets with twitter search queries like "-filter:retweets" and "-(Keyword you don't want)" for example;
```
(from:USERNAME) -Giveaway -filter:retweets -filter:mentions -?
```

### Resumable Crawling
Sometimes you need to run a crawler for a long time. It is possible that the crawler
terminates unexpectedly. In such cases, it might be desirable to resume the crawling.
You would be able to resume a previously stopped/crashed crawl using the following
settings:
```Typescript
scheduleJob("*/5 * * * *", async () => {
      let result = await crawler(tokenCount,syncCheck[0].lastSync);
      if (typeof result === "number") {
        tokenCount = result;
      } 
    });
```
However, you should note that it might make the crawling slightly slower.


## License

Copyright (c) 2010-2018 Yasser Ganjisaffar

Published under [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0), see LICENSE

### About this project

Palantir is a micro-saas project which is analyses tweets of crypto influencers to predict the direction of the market.  
This project was made for [Teknasyon Hackathon '22 - Yüzük Kardeşliği](https://teknasyon.com/tech/hackathon22/#/).  
We took 2nd place among 13 teams.  
![mordor idman yurdu :)](https://raw.githubusercontent.com/muratdemirci/palantir-be/dio/hackathonwin.jpeg "mordor idman yurdu :))")
