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
		  headless : false
  	});

	console.log("stat1")
	  
  const page = await browser.newPage();

	console.log("stat2")
  // Navigate the page to a URL
  await page.goto('https://www.google.com/');


	  let content = await page.content()


	res.send(content)

  await browser.close();
	return
	}catch(e){
		console.log(e)
		res.send(e)
	}
});

module.exports = {
	scrape
}
