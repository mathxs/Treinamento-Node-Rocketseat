import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authencicate } from './controllers/authenticate'
import { profile } from './controllers/profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authencicate)

  /** Apenas se o usuario estiver autenticado */
  app.get('/me', profile)
}
