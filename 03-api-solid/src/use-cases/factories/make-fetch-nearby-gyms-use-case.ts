import { FetchNearbyGymUserCase } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const userCase = new FetchNearbyGymUserCase(gymsRepository)

  return userCase
}
