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

  test("Should return true if exist balance relation with user-id", async () => {
    const data = generateData();
    const userId = data.userId;

    await balanceRepository.add(data);
    const exist = await balanceRepository.containBalance(userId);

    expect(exist).toBeTruthy();
  });

  test("Should return false if not exist balance relation with user-id", async () => {
    const data = generateData();
    await balanceRepository.add(data);
    const exist = await balanceRepository.containBalance("110010");

    expect(exist).toBeFalsy();
  });

  test("Should update balance column with new data", async () => {
    const data = generateData(0, 1000);
    const newData = generateData(0, 2000);
    const userId = data.userId;
    newData.userId = userId;

    await balanceRepository.add(data);
    await balanceRepository.updateBalance(newData);

    const stored = await balanceRepository.getBalance(userId);

    expect(BalanceMap.toPersist(stored)).toEqual(newData);
  });
});