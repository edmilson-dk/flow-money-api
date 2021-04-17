import { BalancePersistDTO } from "../../../domain/dtos/balance";

export interface IBalanceRepository {
  add: ({ total, joined, left, userId }: BalancePersistDTO) => Promise<void>;
  containBalance: (userId: string) => Promise<boolean>;
  updateBalance: (data: BalancePersistDTO) => Promise<void>;
  deleteBalance: (userId: string) => Promise<void>;
}