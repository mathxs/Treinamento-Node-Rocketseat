// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { expect, describe, test, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCeckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let userRepositoty: InMemoryCeckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    userRepositoty = new InMemoryCeckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(userRepositoty, gymsRepository)
    vi.useFakeTimers()

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript',
      description: '',
      phone: '',
      latitude: new Decimal(-16.6756352),
      longtitude: new Decimal(-49.2535808),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('shuld be able to check-in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.6756352,
      userLongitude: -49.2535808,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('shuld not be able to check-in in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.6756352,
      userLongitude: -49.2535808,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -16.6756352,
        userLongitude: -49.2535808,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  test('shuld not be able to check-in in twice, but in different day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.6756352,
      userLongitude: -49.2535808,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.6756352,
      userLongitude: -49.2535808,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('shuld not be able to check-in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript',
      description: '',
      phone: '',
      latitude: new Decimal(-16.6970115),
      longtitude: new Decimal(-49.3806102),
    })

    await expect(
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -16.6756352,
        userLongitude: -49.2535808,
        // userLatitude: -16.6970115,
        // userLongitude: -49.3806102,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
