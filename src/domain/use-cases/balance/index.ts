import { BalanceDTO } from "../../entities/dtos/balance";

export interface BalanceUseCases {
  add: ({ total, joined, left }: BalanceDTO) => Promise<void>;
}