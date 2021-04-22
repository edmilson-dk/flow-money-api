import { Router } from "express";
import { adaptRoute } from "../../../adapters/express-adapter";
import { makeGetBalanceController } from "../../../factories/balance/get-balance";

const balanceRoutes = Router();

balanceRoutes.get("/balance", adaptRoute(makeGetBalanceController()));

export default balanceRoutes;