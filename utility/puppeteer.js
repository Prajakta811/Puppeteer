import puppeteer from "puppeteer";

async function puppeteerScrapper(username) {
  const url = `https://github.com/${username}`;
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const profileData = await page.evaluate(() => {
    const getText = (selector) => {
      const el = document.querySelector(selector);
      return el ? el.innerText.trim() : null;
    };

    return {
      name: getText("h1.vcard-names span.p-name"),
      username: getText("h1.vcard-names span.p-nickname"),
      bio: getText("div.p-note"),
      repositories: +getText('a[href$="?tab=repositories"] .Counter') || 0,
      followers: +getText('a[href$="?tab=followers"] span.text-bold') || 0,
      following: +getText('a[href$="?tab=following"] span.text-bold') || 0,
    };
  });

  // Navigate to the repositories tab and sort by stars
  await page.goto(`${url}?tab=repositories&sort=stargazers`, {
    waitUntil: "domcontentloaded",
  });

  const topRepos = await page.evaluate(() => {
    const repos = [];
    const repoList = document.querySelectorAll("li source");
    document.querySelectorAll('li[itemprop="owns"]')?.forEach((repoEl, i) => {
      if (i < 3) {
        const name = repoEl
          .querySelector('a[itemprop="name codeRepository"]')
          ?.innerText.trim();
        const starsText =
          repoEl
            .querySelector('a[href$="/stargazers"]')
            ?.innerText.trim()
            .replace(",", "") || "0";
        repos.push({ name, stars: +starsText || 0 });
      }
    });
    return repos;
  });

  await browser.close();

  return {
    ...profileData,
    top_repositories: topRepos,
  };
}

export { puppeteerScrapper };
