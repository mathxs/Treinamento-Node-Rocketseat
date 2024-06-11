import { expect, describe, test, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  test('shuld be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: 'Sou uma academia',
      phone: '11912345678',
      latitude: -16.6756352,
      longtitude: -49.2535808,
    })
    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: 'Sou uma academia',
      phone: '11912345678',
      latitude: -16.6756352,
      longtitude: -49.2535808,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  test('shuld be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ` + i,
        description: 'Sou uma academia',
        phone: '11912345678',
        latitude: -16.6756352,
        longtitude: -49.2535808,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    // console.log(gyms)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
