import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Checkin Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)
    // console.log(token)

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -16.6756352,
        longitude: -49.2535808,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -16.6756352,
        longitude: -49.2535808,
      })

    expect(response.statusCode).toEqual(201)
  })
})
