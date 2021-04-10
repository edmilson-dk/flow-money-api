import { BalancePersistDTO } from "../../dtos/balance";

export interface BalanceUseCases {
  add: ({ total, joined, left }: BalancePersistDTO) => Promise<void>;
}