import { prisma } from '@/lib/prisma'
import { UserRepositoty } from '@/repositories/prisma/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

// SOLID
//D - Dependency Inversion
export class RegisterUseCase {
  constructor(private userRepositoty: UserRepositoty) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)
    const userWithSameEmail = await this.userRepositoty.findByEmail(email)
    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
      // return reply.status(409).send()
    }

    //const prismaUsersRepository = new PrismaUsersRepository()
    await this.userRepositoty.create({
      name,
      email,
      password_hash,
    })
  }
}
