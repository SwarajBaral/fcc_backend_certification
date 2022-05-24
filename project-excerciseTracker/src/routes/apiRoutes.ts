import { Router } from "express";
import { exerciseController } from "../controllers/ExcerciseController";
import { userController } from "../controllers/UserController";

const router = Router();

router.get("/users", userController.GetAllUsers);
router.post("/users", userController.AddUser);

router.post("/users/:id/exercises", exerciseController.AddExercise);
router.get("/users/:id/logs", exerciseController.GetExerciseLogs);

export const apiRoutes = router;
