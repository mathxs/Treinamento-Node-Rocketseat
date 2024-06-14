import { SearchGymsUseCase } from '../search-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const userCase = new SearchGymsUseCase(gymsRepository)

  return userCase
}
