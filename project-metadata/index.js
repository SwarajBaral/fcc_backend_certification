var express = require("express");
var cors = require("cors");
const path = require("path");
const multer = require("multer");

require("dotenv").config();

const storage = multer.diskStorage({
  destination: __dirname + "/uploads",
  filename: function (req, file, cb) {
    const originalName = path.parse(file.originalname).name;
    const uniqueSuffix = new Date().getTime();
    const extension = path.extname(file.originalname);

    const fileName = `${uniqueSuffix}-${originalName}${extension}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

var app = express();

app.use(cors());

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  console.log(req.file);
  const name = req.file.originalname;
  const type = req.file.mimetype;
  const size = req.file.size;
  res.json({
    name,
    type,
    size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
