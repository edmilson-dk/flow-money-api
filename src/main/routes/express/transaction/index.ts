import { Router } from "express";
import { adaptRoute } from "../../../adapters/express-adapter";
import { makeAddTransactionController } from "../../../factories/transaction/add-transaction";

const transactionRoutes = Router();

transactionRoutes.post("/create/transaction", adaptRoute(makeAddTransactionController()));

export default transactionRoutes;