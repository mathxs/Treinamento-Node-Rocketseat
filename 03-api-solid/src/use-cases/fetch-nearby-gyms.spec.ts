import { expect, describe, test, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymUserCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymUserCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymUserCase(gymsRepository)
  })

  test('shuld be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'Sou uma academia',
      phone: '11912345678',
      latitude: -16.6756352,
      longtitude: -49.2535808,
    })
    await gymsRepository.create({
      title: 'Far Gym',
      description: 'Sou uma academia',
      phone: '11912345678',
      latitude: -16.3699815,
      longtitude: -48.9382715,
    })

    const { gyms } = await sut.execute({
      userLatitude: -16.6756352,
      userLongitude: -49.2535808,
      // userLatitude: -16.6970115,
      // userLongitude: -49.3806102,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
