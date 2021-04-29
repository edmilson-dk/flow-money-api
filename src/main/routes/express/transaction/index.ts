import { Router } from "express";
import { adaptRoute } from "../../../adapters/express-adapter";
import { makeAddTransactionController, makeDropTransactionController } from "../../../factories/transaction";

const transactionRoutes = Router();

transactionRoutes.post("/create/transaction", adaptRoute(makeAddTransactionController()));
transactionRoutes.delete("/drop/transaction/:id", adaptRoute(makeDropTransactionController()));

export default transactionRoutes;