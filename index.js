const express = require("express");
const { scrape } = require("./scrape");

const app = express();

const PORT = process.env.PORT || 3000


app.get("/scrape", (req, res) =>{
	scrape(res);
})

app.get("/", (req, res) => {

	res.send("hello there this is /")
})

app.listen(PORT, () => {
	console.log("server runs on port:", PORT)

})
