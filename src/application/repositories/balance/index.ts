import { BalancePersistDTO } from "../../../domain/dtos/balance";

export interface IBalanceRepository {
  add: (data: BalancePersistDTO) => Promise<void>;
  getBalance: (userId: string) => Promise<BalancePersistDTO>;
  containBalance: (userId: string) => Promise<boolean>;
  updateBalance: (data: BalancePersistDTO) => Promise<void>;
}