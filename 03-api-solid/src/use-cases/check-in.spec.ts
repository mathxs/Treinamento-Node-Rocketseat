// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { expect, describe, test, beforeEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCeckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let userRepositoty: InMemoryCeckInsRepository
let sut: CheckInUseCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    userRepositoty = new InMemoryCeckInsRepository()
    sut = new CheckInUseCase(userRepositoty)
  })

  test('shuld be able to check-in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
