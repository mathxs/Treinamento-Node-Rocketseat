export class LateCheckInValidationError extends Error {
  constructor() {
    super('O checkin só pode ser validado em até 20 minutos apos ser criado')
  }
}
