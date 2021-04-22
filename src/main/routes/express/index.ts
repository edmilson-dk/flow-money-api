import { Router } from "express";
import balanceRoutes from "./balance";
import authMiddleware from "./middlewares/auth-middleware";
import transactionRoutes from "./transaction";
import userRoutes from "./user";

const routes = Router();

routes.use(userRoutes);

// authenticate user middleware
routes.use("/session", authMiddleware);

routes.use("/session", transactionRoutes);
routes.use("/session", balanceRoutes);

export default routes;