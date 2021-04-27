import TransactionRepository from "./index";
import { cleanColumn } from "../helpers/knex-helpers";
import { generateId } from "../../../../../utils/generateId";

function generateData(id) {
  return {
    userId: id,
    category: "Test category",
    isDecrement: false,
    value: 1000,
    title: "Test title",
  };
}

describe("Transaction repository tests", () => {
  const transactionRepository = new TransactionRepository();

  beforeEach(async () => {
    await cleanColumn("transactions");
  });

  test("Should add an transaction data in database", async () => {
    const data = generateData(generateId());
    const userId = data.userId;

    await transactionRepository.add(data);
    const stored = await transactionRepository.getTransaction(userId);

    expect(stored).toEqual(data);
  });

  test("Should return true if exists an transaction by title", async () => {
    const data = generateData(generateId());
    const title = data.title;

    await transactionRepository.add(data);
    const exists = await transactionRepository.existsTransactionByTitle(title);

    expect(exists).toBeTruthy();
  });
});