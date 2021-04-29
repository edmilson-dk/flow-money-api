import TransactionUseCases from "./index";
import TransactionRepository from "../../../infra/repositories/postgres/knex/transaction/";
import BalanceRepository from "../../../infra/repositories/postgres/knex/balance/";
import BalanceUseCases from "../balance";
import { cleanColumn } from "../../../infra/repositories/postgres/knex/helpers/knex-helpers";
import { generateId } from "../../../utils/generateId";

function generateData(userId: string) {
  return {
    userId,
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

  describe("Add transaction tests", () => {
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

    test("Should not add an transaction with invalid 'value' value", async () => {
      const data = generateData(generateId());
      const transaction = await transactionUseCases.add({ ...data, value: -10 });
      expect(transaction.isLeft()).toBeTruthy();
    });

    test("Should not add an transaction with invalid is-decrement value", async () => {
      const data = generateData(generateId());
      const transaction = await transactionUseCases.add({ ...data, isDecrement: "" });
      expect(transaction.isLeft()).toBeTruthy();
    });
  });

  describe("Drop transaction tests", () => {
    let transactionId = '';
    const data = generateData(generateId());

    beforeEach(async () => {
      const transaction = await transactionUseCases.add(data);
      if (transaction.isLeft()) return;
      transactionId = transaction.value.id;
    });

    test("Should delete the transaction with success", async () => {
      const drop = await transactionUseCases.dropTransaction(transactionId);
      expect(drop.isRight()).toBeTruthy();
    });
  });
});