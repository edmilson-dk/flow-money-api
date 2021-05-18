import TransactionRepository from "./index";
import { cleanColumn } from "../helpers/knex-helpers";
import { generateId } from "../../../../../utils/generateId";

function generateData(userId: string) {
  return {
    userId,
    category: "Test category",
    isDecrement: false,
    value: 1000,
    title: "Test title",
    id: "10101010"
  };
}

describe("Transaction repository tests", () => {
  const transactionRepository = new TransactionRepository();

  beforeEach(async () => {
    await cleanColumn("transactions");
  });

  test("Should add an transaction data in database", async () => {
    const data = generateData(generateId());
 
    await transactionRepository.add(data);
    const stored = await transactionRepository.getTransaction(data.id, data.userId);
    
    expect(stored).toEqual(data);
  });

  test("Should return true if exists an transaction by title", async () => {
    const data = generateData(generateId());
    const title = data.title;

    await transactionRepository.add(data);
    const exists = await transactionRepository.existsTransactionByTitle(title, data.userId);

    expect(exists).toBeTruthy();
  });

  test("Should return false if not exists an transaction by title", async () => {
    const data = generateData(generateId());

    await transactionRepository.add(data);
    const exists = await transactionRepository.existsTransactionByTitle("error", data.userId);

    expect(exists).toBeFalsy();
  });

  test("Should return true if exists an transaction by id", async () => {
    const data = generateData(generateId());
    const id = data.id;

    await transactionRepository.add(data);
    const exists = await transactionRepository.existsTransactionById(id, data.userId);

    expect(exists).toBeTruthy();
  });

  test("Should return false if not exists an transaction by id", async () => {
    const data = generateData(generateId());

    await transactionRepository.add(data);
    const exists = await transactionRepository.existsTransactionById("error", data.userId);

    expect(exists).toBeFalsy();
  });

  test("Should return transaction data if deleted with success", async () => {
    const data = generateData(generateId());

    await transactionRepository.add(data);
    const drop = await transactionRepository.dropTransaction(data.id, data.userId);

    expect(drop).toEqual(data);
  });

  test("Should return all transactions data", async () => {
    const dataOne = generateData(generateId());
    const dataTwo = { ...dataOne, id: "9990099", title: "Teste other title"};

    await transactionRepository.add(dataOne);
    await transactionRepository.add(dataTwo);
    const transactions = await transactionRepository.getTransactions(dataOne.userId);

    expect(Array.isArray(transactions)).toBeFalsy();
  });

  test("Should return empty array if not alredy exists transactions", async () => {
    const dataOne = generateData(generateId());
    const transactions = await transactionRepository.getTransactions(dataOne.userId);

    expect(Array.isArray(transactions)).toBeTruthy();
  });
});