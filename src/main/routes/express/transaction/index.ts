import { Router } from "express";
import { adaptRoute } from "../../../adapters/express-adapter";
import { 
  makeAddTransactionController, 
  makeDropTransactionController, 
  makeGetTransactionsController
 } from "../../../factories/transaction";

const transactionRoutes = Router();

transactionRoutes.post("/create/transaction", adaptRoute(makeAddTransactionController()));
transactionRoutes.delete("/drop/transaction/:id", adaptRoute(makeDropTransactionController()));
transactionRoutes.get("/transactions", adaptRoute(makeGetTransactionsController()));

export default transactionRoutes;