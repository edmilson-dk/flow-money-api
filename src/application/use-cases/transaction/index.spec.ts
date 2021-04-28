import TransactionUseCases from "./index";
import TransactionRepository from "../../../infra/repositories/postgres/knex/transaction/";
import BalanceRepository from "../../../infra/repositories/postgres/knex/balance/";
import BalanceUseCases from "../balance";
import { cleanColumn } from "../../../infra/repositories/postgres/knex/helpers/knex-helpers";
import { generateId } from "../../../utils/generateId";

function generateData(id: string) {
  return {
    userId: id,
    category: "Test category",
    isDecrement: false,
    value: 1000,
    title: "Test title",
  };
}

describe("Transaction use cases tests", () => {
  const transactionRepository = new TransactionRepository();
  const balanceUseCases = new BalanceUseCases(new BalanceRepository());
  const transactionUseCases = new TransactionUseCases(transactionRepository, balanceUseCases);

  beforeEach(async () => {
    await cleanColumn("transactions");
    await cleanColumn("balances");
  });

  test("Should add an transaction", async () => {
    const data = generateData(generateId());
    const transaction = await transactionUseCases.add(data);
    expect(transaction.isRight()).toBeTruthy();
  });
  test("Should not add an transaction with invalid category value", async () => {
    const data = generateData(generateId());
    const transaction = await transactionUseCases.add({ ...data, category: "" });
    expect(transaction.isLeft()).toBeTruthy();
  });
  test("Should not add an transaction with invalid title value", async () => {
    const data = generateData(generateId());
    const transaction = await transactionUseCases.add({ ...data, title: "aa" });
    expect(transaction.isLeft()).toBeTruthy();
  });
});