export class AlredyExistsTransactionError extends Error implements UsecaseError {
  constructor (title: string) {
    super(`The transaction with title: ${title} alredy exists`);
    this.name = 'AlredyExistsTransactionError';
  }
}
