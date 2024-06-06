// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { expect, describe, test } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExsitsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  test('shuld be able to register', async () => {
    const userRepositoty = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepositoty)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('should hash user password upon registration', async () => {
    // const prismaUsersRepository = new PrismaUsersRepository()
    // const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    const userRepositoty = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepositoty)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  test('should not be able to register with same email twice', async () => {
    const userRepositoty = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepositoty)
    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExsitsError)
  })
})
