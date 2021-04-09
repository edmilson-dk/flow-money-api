import { TransactionsDTO } from "../dtos/transactions";

class Transactions {
  public value: number;
  public isDecrement: boolean;
  public title: string;
  public category: string;

  constructor({ value, isDecrement, title, category }: TransactionsDTO) {
    this.value = value;
    this.isDecrement = isDecrement,
    this.title = title;
    this.category = category;
  }

  getValues() {
    return {
      value: this.value,
      isDecrement: this.isDecrement,
      title: this.title,
      category: this.category,
    }
  }
}

export default Transactions;