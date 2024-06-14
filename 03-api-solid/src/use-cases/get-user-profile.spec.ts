// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { expect, describe, test, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetUserProfileUseCase } from './get-user-profile'

let userRepositoty: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepositoty = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(userRepositoty)
  })

  test('shuld be able to get user profile', async () => {
    const createdUser = await userRepositoty.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  test('shuld be not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'not found',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
