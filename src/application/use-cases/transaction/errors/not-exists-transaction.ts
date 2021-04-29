export class NotExistsTransactionError extends Error implements UsecaseError {
  constructor (id: string) {
    super(`The transaction with id: ${id} not exists`);
    this.name = 'NotExistsTransactionError';
  }
}