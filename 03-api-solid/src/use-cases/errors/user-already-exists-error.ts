export class UserAlreadyExsitsError extends Error {
  constructor() {
    super('E-mail already exists')
  }
}
