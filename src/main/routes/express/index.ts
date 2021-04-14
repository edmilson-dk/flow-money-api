import { Router } from "express";
import userRoutes from "./user";

const routes = Router();

routes.use(userRoutes);

export default routes;