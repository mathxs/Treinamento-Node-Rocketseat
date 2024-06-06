// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { expect, describe, test } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  test('shuld be able to register', async () => {
    const userRepositoty = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(userRepositoty)

    await userRepositoty.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('shuld be not be able to authenticate with wrong email', async () => {
    const userRepositoty = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(userRepositoty)

    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('shuld be not be able to authenticate with wrong password', async () => {
    const userRepositoty = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(userRepositoty)

    await userRepositoty.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
