import { Express, Router } from "express";
import { apiRoutes } from "./apiRoutes";

const router = Router();

export const RegisterRoutes = (app: Express): void => {
  app.use("/api", apiRoutes);
};
