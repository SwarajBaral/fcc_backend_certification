import moment from "moment";
import mongoose from "mongoose";
import { ExerciseRecordModel } from "../datastore/excercise_datastore/models/ExcerciseModel";
import { UserRecordModel } from "../datastore/user_datastore/models/UserModel";
import { ServiceError } from "./UserServiceImpl";

interface IQuery {
  userId: string;
  date?: {
    $gte?: string;
    $lte?: string;
  };
}

interface IExercise {
  username: string;
  description: string;
  duration: number;
  userId: string;
  date: string;
}

class ExerciseServiceImpl {
  async AddExercise(data: {
    uid: string;
    desc: string;
    duration: number;
    date: string;
  }): Promise<any> {
    const usernameByid = await UserRecordModel.findById(data.uid)
      .select({ username: 1, _id: 0 })
      .exec();

    if (usernameByid) {
      const excerciseDbObj = {
        username: usernameByid.username,
        description: data.desc,
        duration: data.duration,
        userId: data.uid,
      } as IExercise;

      if (data.date) {
        excerciseDbObj.date = data.date;
      } else {
        excerciseDbObj.date = moment().format("YYYY-MM-DD");
      }

      console.log(excerciseDbObj);

      const result = new ExerciseRecordModel(excerciseDbObj);

      await result.save();

      return {
        username: excerciseDbObj.username,
        description: excerciseDbObj.description,
        duration: excerciseDbObj.duration,
        date: new Date(excerciseDbObj.date).toDateString(),
        _id: excerciseDbObj.userId,
      };
    }
    throw new ServiceError(
      "USER_DOESNT_EXISTS",
      "User with this id doesn't exists"
    );
  }

  async GetLogs(data: {
    userId: string;
    from: string;
    to: string;
    limit: string;
  }): Promise<any> {
    try {
      const usernameByid = await UserRecordModel.findById(data.userId)
        .select({ username: 1, _id: 0 })
        .exec();

      if (usernameByid) {
        const query = {} as IQuery;

        query.userId = data.userId;

        if (data.from) {
          query.date = {
            ...query.date,
            $gte: new Date(data.from).toString(),
          };
        }

        if (data.to) {
          query.date = {
            ...query.date,
            $lte: new Date(data.to).toString(),
          };
        }

        const allExercises = await ExerciseRecordModel.find(query)
          .limit(Number(data.limit))
          .select({ description: 1, duration: 1, date: 1, _id: 0 });

        const modLogs = allExercises.map((log) => {
          return {
            duration: log.duration,
            description: log.description,
            date: new Date(log.date).toDateString(),
          };
        });

        const logResponse = {
          username: usernameByid.username,
          count: allExercises.length,
          _id: data.userId,
          log: modLogs,
        };

        return logResponse;
      } else {
        throw new ServiceError(
          "USER_DOESNT_EXISTS",
          "User with this id doesn't exists"
        );
      }
    } catch (error) {
      throw error;
    }
  }
}

export const exerciseService = new ExerciseServiceImpl();
