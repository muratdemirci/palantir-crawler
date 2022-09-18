import axios from "axios";

const testThisShit = async () => {
  try {
    const token = "AAAAAAAAAAAAAAAAAAAAAGO7hAEAAAAAh3vTU5dXYwAjytztOcB0mwTlhhk%3DnigIK316GX8FvHDmPA6jDZCfB1aOYOPActWtTrLSmZYC7QplcJ";
    const query = "from:0xMWR";
    const fullArchiveSearch = await axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${query}&max_results=10&&tweet.fields=author_id,created_at,id,text,public_metrics`,{headers:{"Authorization" : `Bearer ${token}`}});
    console.log(fullArchiveSearch.data.data[0].public_metrics)
  } catch (error) {
    console.log(error);
    console.log("error");
  }
};

testThisShit();