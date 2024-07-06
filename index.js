const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
async function performScraping() {
  try {
    const axiosResponse = await axios.get(
      "https://www.linkedin.com/jobs/search/?keywords=mlops",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        },
      }
    );

    const $ = cheerio.load(axiosResponse.data);
    const jobs = [];

    $(
      ".base-card__full-link.absolute.top-0.right-0.bottom-0.left-0.p-0.z-[2]"
    ).each((index, element) => {
      const jobTitle = $(element)
        .find(
          ".top-card-layout__title font-sans text-lg papabear:text-xl font-bold leading-open text-color-text mb-0 topcard__title"
        )
        .text()
        .trim();
      const companyName = $(element)
        .find(".topcard__org-name-link topcard__flavor--black-link")
        .text()
        .trim();
      const jobLocation = $(element)
        .find(".topcard__flavor topcard__flavor--bullet")
        .text()
        .trim();
      const jobDescription = $(element)
        .find(".show-more-less-html__markup relative overflow-hidden")
        .text()
        .trim();
      const jobPostDate = $(element)
        .find(".posted-time-ago__text topcard__flavor--metadata")
        .text()
        .trim();
      const skillsNeeded = $(element)
        .find(".description__job-criteria-list")
        .text()
        .trim();
      const applicationLink = $(element).attr(
        "apply-button apply-button--default top-card-layout__cta mt-2 ml-1.5 h-auto babybear:flex-auto top-card-layout__cta--primary btn-md btn-primary"
      );

      jobs.push({
        jobTitle,
        companyName,
        jobLocation,
        jobDescription,
        jobPostDate,
        skillsNeeded,
        applicationLink,
      });
    });

    const jobsJSON = JSON.stringify(jobs, null, 2);
    fs.writeFileSync("mlops_jobs.json", jobsJSON);
    console.log("Scraping completed and data saved to mlops_jobs.json");

    console.log("Scraping completed and data saved to mlops_jobs.json");
  } catch (error) {
    console.error("Error during web scraping:", error);
  }
}

performScraping();
