import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to list nearby gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    // console.log(token)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Near Gym',
        description: 'Some',
        phone: '1199999999',
        latitude: -16.6756352,
        longitude: -49.2535808,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Far Gym',
        description: 'Some',
        phone: '1199999999',
        latitude: -16.3699815,
        longitude: -48.9382715,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -16.6756352,
        longitude: -49.2535808,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Near Gym' }),
    ])
  })
})
