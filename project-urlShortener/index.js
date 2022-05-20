require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dns = require("dns");

const app = express();

var url_db = [];

app.use(bodyParser.urlencoded({ extended: true }));
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.post("/api/shorturl", async (req, res) => {
  const originalUrl = req.body.url;

  const parsedUrl = new URL(originalUrl);

  await dns.lookup(parsedUrl.hostname, (err, address, family) => {
    if (err) {
      res.json({
        error: "invalid url",
      });
    } else {
      var checkPrimaryKey = Math.round(Math.random() * 1e4);

      if (
        url_db.filter((url) => url.short_url === checkPrimaryKey).length > 0
      ) {
        checkPrimaryKey = Math.round(Math.random() * 1e4) + 1;
      }

      const urlObj = {
        original_url: originalUrl,
        short_url: checkPrimaryKey,
      };

      url_db.push(urlObj);

      res.json(urlObj);
    }
  });
});

app.get("/api/shorturl/:shortId", async (req, res) => {
  const id = req.params.shortId;

  const getUrlObj = url_db.filter((url) => url.short_url === Number(id));

  console.log(id, getUrlObj);

  if (getUrlObj.length > 0) {
    res.redirect(getUrlObj[0].original_url);
  }
  res.status(400).json({
    error: "No record",
  });
});

app.get("/api/db/all-records", (req, res) => {
  res.json({ db: url_db });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
