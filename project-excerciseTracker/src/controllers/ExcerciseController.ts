import { Request, Response } from "express";
import { ExerciseRecordModel } from "../datastore/excercise_datastore/models/ExcerciseModel";
import { UserRecordModel } from "../datastore/user_datastore/models/UserModel";
import { exerciseService } from "../services/ExcerciseServiceImpl";
import { ServiceError } from "../services/UserServiceImpl";

class ExerciseController {
  public async AddExercise(req: Request, res: Response) {
    try {
      const exerciseBody = {
        uid: req.params.id,
        desc: req.body.description,
        duration: Number(req.body.duration),
        date: req.body.date,
      };

      console.log(exerciseBody);

      const result = await exerciseService.AddExercise(exerciseBody);
      res.send(result);
    } catch (error) {
      if (error instanceof ServiceError) {
        res.status(400).send({
          code: error.Code,
          message: error.Message,
        });
      }
      res.status(500).send({
        code: "UNEXPECTED_ERROR",
        message: "Something unexpected happened",
        error,
      });
    }
  }

  public async GetExerciseLogs(req: Request, res: Response) {
    try {
      const logBody = {
        userId: req.params.id as string,
        from: req.query.from as string,
        to: req.query.to as string,
        limit: req.query.limit as string,
      };

      const result = await exerciseService.GetLogs(logBody);

      res.send(result);
    } catch (error) {
      if (error instanceof ServiceError) {
        res.status(400).send({
          code: error.Code,
          message: error.Message,
        });
      }
      res.status(500).send({
        code: "UNEXPECTED_ERROR",
        message: "Something unexpected happened",
      });
      console.log(error);
    }
  }
}

export const exerciseController = new ExerciseController();
