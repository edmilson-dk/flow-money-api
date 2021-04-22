import { AddBalanceResponse } from "../../../application/use-cases/balance/responses/add-balance";
import { GetBalanceResponse } from "../../../application/use-cases/balance/responses/get-balance";
import {  BalanceDataDTO } from "../../dtos/balance";

export interface IBalanceUseCases {
  add: (data: BalanceDataDTO) => Promise<AddBalanceResponse>;
  getBalance: (userId: string) => Promise<GetBalanceResponse>;
  //getTotal: (userId: string) => Promise<number>;
}