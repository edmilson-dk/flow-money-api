import { IBalanceUseCases } from "../../../domain/use-cases/balance";
import { IBalanceRepository } from "../../repositories/balance";
import {  BalanceDataDTO } from "../../../domain/dtos/balance";
import { Either, left, right } from "../../../shared/either";
import { JoinedError } from "../../../domain/entities/Balance/errors/joined-error";
import { LeftValueError } from "../../../domain/entities/Balance/errors/left-error";
import Balance from "../../../domain/entities/Balance";
import { AddBalanceResponse } from "./responses/add-balance";
import BalanceMap from "../../../domain/dtos/balance/balance-map";
import { GetBalanceResponse } from "./responses/get-balance";
import { NotExistsBalanceError } from "./errors/not-exists-balance-error";

class BalanceUseCases implements IBalanceUseCases {
  private balanceRepository: IBalanceRepository;

  constructor(balanceRepository: IBalanceRepository) {
    this.balanceRepository = balanceRepository;
  }

  async add(data: BalanceDataDTO): Promise<AddBalanceResponse> {
    const balanceOrError: Either<JoinedError | LeftValueError, Balance> = Balance.create(data);
   
    if (balanceOrError.isLeft()) {
      return left(balanceOrError.value);
    }

    const balance: Balance = balanceOrError.value;
    const balanceData = BalanceMap.toPersist(balance.getValues());

    if (await this.balanceRepository.containBalance(data.userId)) {
      await this.balanceRepository.updateBalance(balanceData);
      return right(balanceData);
    }
    
    await this.balanceRepository.add(balanceData);
    return right(balanceData);
  }

  async getBalance(userId: string): Promise<GetBalanceResponse> {
    if (!(await this.balanceRepository.containBalance(userId))) {
      return left(new NotExistsBalanceError(userId));
    }

    const balance = await this.balanceRepository.getBalance(userId);

    return right(BalanceMap.toPersist(balance));
  }
}

export default BalanceUseCases;