import { Request, Response } from "express";
import { UserRecordModel } from "../datastore/user_datastore/models/UserModel";
import { ServiceError, userService } from "../services/UserServiceImpl";

class UserController {
  public async GetAllUsers(req: Request, res: Response) {
    console.log(req.params);
    const user = req.body.username;

    const allUsers = await UserRecordModel.find();

    res.send(allUsers);
  }

  public async AddUser(req: Request, res: Response) {
    try {
      const userData = {
        username: req.body.username,
      };

      const result = await userService.CreateUser(userData);

      return res.send(result);
    } catch (error) {
      console.error(JSON.stringify(error));
      res.status(400).json({
        code: (error as ServiceError).Code,
        error: (error as ServiceError).Message,
      });
    }
  }
}

export const userController = new UserController();
