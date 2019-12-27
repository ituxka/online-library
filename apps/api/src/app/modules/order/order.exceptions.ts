export class NotAvailableToOrderException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrderError';
  }
}
