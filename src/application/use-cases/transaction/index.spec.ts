import TransactionUseCases from "./index";
import { TransactionsDTO } from "../../../domain/dtos/transaction";
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
      const drop = await transactionUseCases.dropTransaction(transactionId, data.userId);
      expect(drop.isRight()).toBeTruthy();
    });   
    
    test("Should not delete the transaction with success if id is empty", async () => {
      const drop = await transactionUseCases.dropTransaction("", data.userId);
      expect(drop.isLeft()).toBeTruthy();
    });   
  });

  describe("Get all transactions tests", () => {
    test("Should return all transactions data", async () => {
      const dataOne = generateData(generateId());
      const dataTwo = { ...dataOne, id: "9990099", title: "Teste other title"};

      await transactionUseCases.add(dataOne);
      await transactionUseCases.add(dataTwo);
      const transactions = await transactionUseCases.getTransactions(dataOne.userId);
    
      expect(Array.isArray(transactions)).toBeFalsy();
    });

    test("Should return empty array if not alredy exists transactions", async () => {
      const dataOne = generateData(generateId());
      const transactions = await transactionUseCases.getTransactions(dataOne.userId);

      expect(Array.isArray(transactions)).toBeTruthy();
    });
  });
});