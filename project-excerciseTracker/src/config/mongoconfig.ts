import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// interface mongooseConnectionOptions extends mongoose.ConnectionOptions
// {
//     retryWrites?: boolean;
// }

const config = {
  useNewUrlParser: true,
  // Doubt
  replicaSet: process.env.MONGOREPLICASET,
  useUnifiedTopology: true,
};

export const db = mongoose.connect(
  "mongodb://localhost:27017/fcc_exercise_tracker",
  config
);

const instrumentMongoDb = (): void => {
  db.then(() => {
    console.log("Mongo Db Connected!");
  }).catch((e) => {
    console.error("Error Connecting Mongo: ", e);
  });
};

export { instrumentMongoDb };
