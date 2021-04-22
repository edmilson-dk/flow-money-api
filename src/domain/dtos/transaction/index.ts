export type TransactionDomainDTO = {
  value: number;
  isDecrement: boolean;
  title: string;
  category: string;
  userId: string;
}

export type TransactionDataDTO = {
  value: number;
  isDecrement: boolean;
  title: string;
  category: string;
  userId: string;
}

export type TransactionPersistDTO = {
  value: number;
  isDecrement: boolean;
  title: string;
  category: string;
  userId: string;
}

export type TransactionDTO = {
  value: number;
  title: string;
  category: string;
  isDecrement: boolean;
}