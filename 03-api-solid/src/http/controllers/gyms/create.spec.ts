import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    // console.log(token)
    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some',
        phone: '1199999999',
        latitude: -16.6756352,
        longitude: -49.2535808,
      })

    expect(response.statusCode).toEqual(201)
  })
})
