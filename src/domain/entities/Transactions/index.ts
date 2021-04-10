import { TransactionsDomainDTO } from "../../dtos/transactions";

class Transactions {
  public value: number;
  public isDecrement: boolean;
  public title: string;
  public category: string;

  constructor({ value, isDecrement, title, category }: TransactionsDomainDTO) {
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