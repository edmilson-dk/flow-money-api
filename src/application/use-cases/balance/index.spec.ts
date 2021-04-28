import BalanceUseCases from "./index";
import BalanceRepository from "../../../infra/repositories/postgres/knex/balance";
import { cleanColumn } from "../../../infra/repositories/postgres/knex/helpers/knex-helpers";
import { generateId } from "../../../utils/generateId";

function generateData(id: string, left = 0, joined = 0) {
  return {
    userId: id,
    left,
    joined,
  }
}

describe("Balance use cases tests", () => {
  const balanceUseCases = new BalanceUseCases(new BalanceRepository());

  beforeEach(async () => {
    await cleanColumn("balances");
  });

  describe("Add balance tests", () => {
    test("Should add balance in database", async () => {
      const data = generateData(generateId());
      const balance = await balanceUseCases.add(data);
      expect(balance.isRight()).toBeTruthy();
    });
    test("Should not add balance with invalid joined value", async () => {
      const data = generateData(generateId());
      const balance = await balanceUseCases.add({ ...data, joined: -10 });
      expect(balance.isLeft()).toBeTruthy();
    });
    test("Should not add balance with invalid left value", async () => {
      const data = generateData(generateId());
      const balance = await balanceUseCases.add({ ...data, left: -10 });
      expect(balance.isLeft()).toBeTruthy();
    });
  });

  describe("Get balance tests", () => {
    test("Should return balance data", async () => {
      const data = generateData(generateId());
      const userId = data.userId;
      await balanceUseCases.add(data);

      const balance = await balanceUseCases.getBalance(userId);
      expect(balance.isRight()).toBeTruthy();
    });
    test("Should not return balance data with invalid user id", async () => {
      const data = generateData(generateId());
      await balanceUseCases.add(data);

      const balance = await balanceUseCases.getBalance("1100");
      expect(balance.isLeft()).toBeTruthy();
    });
  });
});