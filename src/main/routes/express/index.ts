import { Router } from "express";
import authMiddleware from "./middlewares/auth-middleware";
import transactionRoutes from "./transaction";
import userRoutes from "./user";

const routes = Router();

routes.use("/session", authMiddleware);
routes.use(userRoutes);
routes.use("/session", transactionRoutes);

export default routes;