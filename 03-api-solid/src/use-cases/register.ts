import { UserRepositoty } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExsitsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

// SOLID
// D - Dependency Inversion
export class RegisterUseCase {
  constructor(private userRepositoty: UserRepositoty) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)
    const userWithSameEmail = await this.userRepositoty.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExsitsError()
      // return reply.status(409).send()
    }

    // const prismaUsersRepository = new PrismaUsersRepository()
    const user = await this.userRepositoty.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
