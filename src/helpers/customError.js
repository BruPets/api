export class CustomError extends Error {
  constructor ({ message, status }) {
    super(message)
    this.name = status
  }
}
