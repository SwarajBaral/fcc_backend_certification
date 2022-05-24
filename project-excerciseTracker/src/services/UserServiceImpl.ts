import { UserRecordModel } from "../datastore/user_datastore/models/UserModel";

export class ServiceError {
  Code: string;
  Message: string;
  constructor(code: string, message: string) {
    this.Code = code;
    this.Message = message;
  }
}

class UserServiceImpl {
  async CreateUser(data: { username: string }): Promise<any> {
    const checkUser = await UserRecordModel.findOne({
      username: data.username,
    });

    if (!checkUser) {
      const userObject = new UserRecordModel(data);
      const result = await userObject.save();
      return { username: result.username, _id: result._id };
    }
    throw new ServiceError(
      "USER_ALREADY_EXISTS",
      "User with this email already exists !"
    );
  }
}

export const userService = new UserServiceImpl();
