import { BalanceDomainDTO } from "../../dtos/balance";

class Balance {
  public joined: number;
  public left: number;
  public total: number;

  constructor({ joined, left, total }: BalanceDomainDTO) {
    this.joined = joined;
    this.left = left;
    this.total = total;
  }

  getValues() {
    return {
      joined: this.joined,
      left: this.left,
      total: this.total,
    }
  }
}

export default Balance;