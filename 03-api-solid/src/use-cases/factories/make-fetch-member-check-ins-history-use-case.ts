import { FetchUserCheckInsHistoryUseCase } from '../fetch-member-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkin-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const userCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

  return userCase
}
