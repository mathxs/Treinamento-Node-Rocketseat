import { expect, describe, test, beforeEach } from 'vitest'
import { InMemoryCeckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepositoty: InMemoryCeckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepositoty = new InMemoryCeckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepositoty)
  })

  test('shuld be able to get check-ins count from metrics', async () => {
    await checkInsRepositoty.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInsRepositoty.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkInsCount).toHaveLength(2)
  })
})
