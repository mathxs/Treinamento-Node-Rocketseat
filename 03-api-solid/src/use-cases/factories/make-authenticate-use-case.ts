import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const makeAuthenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

  return makeAuthenticateUseCase
}
