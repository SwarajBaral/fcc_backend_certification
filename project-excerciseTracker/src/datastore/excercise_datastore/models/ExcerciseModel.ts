import mongoose from "mongoose";
import moment from "moment";

let Schema = mongoose.Schema;

let ExerciseSchema = new Schema({
  username: String,
  description: String,
  duration: Number,
  date: {
    type: Date,
    default: Date.now(),
  },
  userId: String,
});

var ExerciseRecordModel = mongoose.model(
  "ExerciseRecord",
  ExerciseSchema,
  "exercises"
);

export { ExerciseRecordModel };
