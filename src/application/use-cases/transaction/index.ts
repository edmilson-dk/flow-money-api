import BalanceMap from "../../../domain/dtos/balance/balance-map";
import { TransactionDataDTO } from "../../../domain/dtos/transaction";
import TransactionMap from "../../../domain/dtos/transaction/transaction-map";
import Transaction from "../../../domain/entities/Transaction";
import { IBalanceUseCases } from "../../../domain/use-cases/balance";
import { ITransactionUseCases } from "../../../domain/use-cases/transaction";
import { left, right } from "../../../shared/either";
import { generateId } from "../../../utils/generateId";
import { ITransactionRepository } from "../../repositories/transaction";
import { GetBalanceResponse } from "../balance/responses/get-balance";
import { AlredyExistsTransactionError } from "./errors/alredy-exists-transaction";
import { AddTransactionResponse } from "./responses/add-transaction";

class TransactionUseCases implements ITransactionUseCases {
  private readonly transactionRepository: ITransactionRepository;
  private readonly balanceUseCases: IBalanceUseCases;

  constructor(transactionRepository: ITransactionRepository, balanceUseCases: IBalanceUseCases) {
    this.transactionRepository = transactionRepository;
    this.balanceUseCases = balanceUseCases;
  }

  async add(data: TransactionDataDTO): Promise<AddTransactionResponse> {
    const id = generateId();
    const transactionOrError = Transaction.create({ ...data, id });
    
    if (transactionOrError.isLeft()) {
      return left(transactionOrError.value);
    }

    const transaction: Transaction = transactionOrError.value;
    const balanceData: GetBalanceResponse = await this.balanceUseCases.getBalance(data.userId);
    const isDecrementOrError = TransactionMap.toDecrementBoolean(data.isDecrement);

    if (await this.transactionRepository.existsTransactionByTitle(data.title)) {
      return left(new AlredyExistsTransactionError(data.title));
    }

    if (isDecrementOrError.isLeft()) {
      return left(isDecrementOrError.value);
    }

    const isDecrement = isDecrementOrError.value;
    
    const transactionData = TransactionMap.toPersist({ ...transaction.getValues(), isDecrement });
  
    if (balanceData.isLeft()) {
      isDecrement
        ? await this.balanceUseCases.add({ joined: 0, left: transactionData.value, userId: data.userId })
        : await this.balanceUseCases.add({ joined: transactionData.value, left: 0, userId: data.userId });
    }

    if (balanceData.isRight()) {
      const balance = BalanceMap.toDTO(balanceData.value);

      if (isDecrement) {
        const newLeftValue = balance.left + transactionData.value;
        await this.balanceUseCases.add({ joined: balance.joined, left: newLeftValue, userId: transactionData.userId });
      } else {
        const newJoinedValue = balance.joined + transactionData.value;
        await this.balanceUseCases.add({ joined: newJoinedValue, left: balance.left, userId: transactionData.userId });
      }
    }

    await this.transactionRepository.add(transactionData);
  
    return right(transactionData);
  }
}

export default TransactionUseCases;