import { Router } from "express";
import { adaptRoute } from "../../../adapters/express-adapter";
import { makeAddUserController } from "../../../factories/user";

const userRoutes = Router();

userRoutes.post("/register", adaptRoute(makeAddUserController()));

export default userRoutes;