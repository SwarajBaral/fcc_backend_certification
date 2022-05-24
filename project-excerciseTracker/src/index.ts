import { Express, Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./routes";
import { instrumentMongoDb } from "./config/mongoconfig";

dotenv.config();

instrumentMongoDb();

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", async (req: Request, res: Response) => {
  const indexPath = path.join(__dirname, "..", "views", "index.html");
  res.sendFile(indexPath);
});

const port = process.env.PORT || 3080;

RegisterRoutes(app);

app.listen(port, () => {
  console.log(`App is running on port http://localhost:${port}`);
});
