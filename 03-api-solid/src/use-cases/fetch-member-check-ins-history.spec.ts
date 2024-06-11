import { expect, describe, test, beforeEach } from 'vitest'
import { InMemoryCeckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-member-check-ins-history'

let checkInsRepositoty: InMemoryCeckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch Check-In History Use Case', () => {
  beforeEach(async () => {
    checkInsRepositoty = new InMemoryCeckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepositoty)
  })

  test('shuld be able to fetch check-in history', async () => {
    await checkInsRepositoty.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInsRepositoty.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  test('shuld be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepositoty.create({
        gym_id: `gym-$(i)`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
  })
})
