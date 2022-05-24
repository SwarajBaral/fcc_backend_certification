import mongoose from "mongoose";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
});

export interface UserJourney {
  username: string;
}

var UserRecordModel = mongoose.model("UserRecord", UserSchema, "users");

export { UserRecordModel };
