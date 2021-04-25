import { left } from "../../../shared/either";
import { JoinedError } from "./errors/joined-error";
import { LeftValueError } from "./errors/left-error";
import { UserIdError } from "./errors/user-id-error";
import Balance from "./index";

const balanceData = {
  joined: 1000,
  left: 500,
  userId: "1882927797"
};

describe("Create a balance entity tests", () => {
  test("Should not create balance entity with invalid joined value", () => {
    const balance = Balance.create({ ...balanceData, joined: -10 });
    expect(balance).toEqual(left(new JoinedError(-10)));
  });
});