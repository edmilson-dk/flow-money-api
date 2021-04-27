import { generateId } from "../../../../../utils/generateId";
import BalanceRepository from "./index";
import { cleanColumn } from "../helpers/knex-helpers";
import BalanceMap from "../../../../../domain/dtos/balance/balance-map";

function generateData(left = 0, joined = 0) {
  return {
    userId: generateId(),
    left,
    joined,
    total: joined - left, 
  };
}

describe("Balance repository tests", () => {
  const balanceRepository = new BalanceRepository();

  beforeEach(async () => {
    await cleanColumn("balances");
  });

  test("Should add an balance data in database", async () => {
    const data = generateData();
    const userId = data.userId;

    await balanceRepository.add(data);
    const stored = await balanceRepository.getBalance(userId);

    expect(BalanceMap.toPersist(stored)).toEqual(data);
  });

  test("Should get an balance data in database", async () => {
    const data = generateData();
    const userId = data.userId;
    await balanceRepository.add(data);

    const stored = await balanceRepository.getBalance(userId);

    expect(BalanceMap.toPersist(stored)).toEqual(data);
  });
});