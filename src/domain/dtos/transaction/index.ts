export type TransactionDomainDTO = {
  value: number;
  isDecrement: boolean | string;
  title: string;
  category: string;
  userId: string;
  id: string;
}

export type TransactionDataDTO = {
  value: number;
  isDecrement: boolean | string;
  title: string;
  category: string;
  userId: string;
}

export type TransactionPersistDTO = {
  value: number;
  isDecrement: boolean | string;
  title: string;
  category: string;
  userId: string;
  id: string;
}

export type TransactionDTO = {
  value: number;
  title: string;
  category: string;
  isDecrement: boolean | string;
  id: string;
  createdAt: string;
}

export type TransactionsDTO = {
  data: TransactionDTO[];
  count: number;
}