import { AddBalanceResponse } from "../../../application/use-cases/balance/responses/add-balance";
import {  BalanceDataDTO } from "../../dtos/balance";

export interface IBalanceUseCases {
  add: ({ joined, left, userId }: BalanceDataDTO) => Promise<AddBalanceResponse>;
  //getTotal: (userId: string) => Promise<number>;
}