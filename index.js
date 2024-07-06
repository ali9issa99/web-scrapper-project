const cheerio = require("cheerio");
const axios = require("axios");

async function performScraping() {
  const axiosResponse = await axios.request({
    method: "GET",
    url: "https://www.linkedin.com/jobs/search?keywords=mlops",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });
}

const $ = cheerio.load(axiosResponse.data);
const htmlElement = $(".elementClass");

    const job_title = []
    const company_name = []
    const job_location = []
    const job_description = []
    const job_postdate= []
    const skills_needed = []
    const application_link = []


performScraping();
