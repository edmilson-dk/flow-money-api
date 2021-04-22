import { BalanceDomainDTO, BalanceDTO, BalancePersistDTO } from ".";

class BalanceMap {
  static toPersist(data: any): BalancePersistDTO {
    return {
      joined: Number(data.joined),
      left: Number(data.left),
      total: Number(data.total),
      userId: data.userId,
    };
  }

  static toDTO(data: any): BalanceDTO {
    return {
      joined: Number(data.joined),
      left: Number(data.left),
      total: Number(data.total),
    }
  }

  static toDomain(data: any): BalanceDomainDTO {
    return {
      joined: Number(data.joined),
      left: Number(data.left),
      userId: data.userId,
    };
  }
}

export default BalanceMap;