export class ValueError extends Error implements DomainError {
  constructor (value: number) {
    super(`The value "${value}" is invalid.`);
    this.name = 'ValueError';
  }
}