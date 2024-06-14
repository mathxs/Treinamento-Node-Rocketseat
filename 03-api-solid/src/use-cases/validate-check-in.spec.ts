import { expect, describe, test, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCeckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let checkInsRepository: InMemoryCeckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCeckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('shuld be able to validate the check-in', async () => {
    const createdcheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdcheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  test('shuld not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistente-checkin-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  test('should not be able to validate the check-in after 20 minutes of this creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))
    const createdcheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    vi.advanceTimersByTime(1000 * 60 * 21) // 21 minutos em milesegundos
    await expect(() =>
      sut.execute({
        checkInId: createdcheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
