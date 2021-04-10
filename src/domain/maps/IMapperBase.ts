export interface IMapperBase<D, P, T> {
  toDomain: (data: any) => D;
  toPersist: (data: any) => P;
  toDTO: (data: any) => T;
}