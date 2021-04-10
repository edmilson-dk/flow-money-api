export type TransactionsDomainDTO = {
  value: number;
  isDecrement: boolean;
  title: string;
  category: string;
}

export type TransactionsPersistDTO = {
  value: number;
  isDecrement: boolean;
  title: string;
  category: string;
  userId: string;
}

export type TransactionsDTO = {
  value: number;
  title: string;
  category: string;
}