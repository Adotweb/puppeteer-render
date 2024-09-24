const puppeteer = require("puppeteer")

require("dotenv").config()

const scrape = (async (res) => {
  // Launch the browser and open a new blank page
  try {
	  const browser = await puppeteer.launch({
	executablePath : process.env.NODE_ENV === "production" ?
	  process.env.PUPPETEER_EXECUTABLE_PATH : 
	  puppeteer.executablePath(),

	  args : [
		  "--no-sandbox",
		  "--disable-setuid-sandbox",
		  "--single-process",
		  "--no-zygote"
	  ],
		  headless : "new"
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://developer.chrome.com/');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  await page.type('.devsite-search-field', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.devsite-result-item-link';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate'
  );
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

res.send(fullTitle)

  await browser.close();
	return
	}catch(e){
		res.send(e)
	}
});

module.exports = {
	scrape
}
