import { Router } from "express";
import { adaptRoute } from "../../../adapters/express-adapter";
import { makeAddUserController, makeGetUserController } from "../../../factories/user";

const userRoutes = Router();

userRoutes.post("/register", adaptRoute(makeAddUserController()));
userRoutes.post("/login", adaptRoute(makeGetUserController()));

export default userRoutes;