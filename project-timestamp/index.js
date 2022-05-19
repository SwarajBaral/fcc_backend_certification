// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/", (req, res) => {
    const date = new Date;

    const parsedDate = date

    return res.status(200).json({unix: parsedDate.getTime(), utc: parsedDate.toGMTString()})
});
app.get("/api/:date", (req, res) => {
    const date = req.params.date.length > 10 ? Number(req.params.date) : req.params.date;

    const parsedDate = new Date(date)
    
    if(isNaN(parsedDate.getTime())){
      return res.status(500).json({error: "Invalid Date"})
    }

    return res.status(200).json({unix: parsedDate.getTime(), utc: parsedDate.toGMTString()})
});


// listen for requests :)
var port = process.env.PORT || 8000
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
