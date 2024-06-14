import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkin-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const userCase = new ValidateCheckInUseCase(checkInsRepository)

  return userCase
}
