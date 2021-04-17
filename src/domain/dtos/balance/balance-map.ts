import { BalancePersistDTO } from ".";

class BalanceMap {
  static toPersist(data: any): BalancePersistDTO {
    return {
      joined: Number(data.joined),
      left: Number(data.left),
      total: data.total,
      userId: data.userId,
    };
  }
}

export default BalanceMap;