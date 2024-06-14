// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { expect, describe, test, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  test('shuld be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'Academia',
      description: 'Sou uma academia',
      phone: '11912345678',
      latitude: -16.6756352,
      longitude: -49.2535808,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
