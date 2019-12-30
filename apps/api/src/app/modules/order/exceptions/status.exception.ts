export class StatusException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StatusException';
  }
}
