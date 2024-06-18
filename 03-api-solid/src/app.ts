import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'

import { ZodError } from 'zod'
import { env } from './env'

import { usersRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'

export const app = fastify()
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(usersRoutes)
app.register(gymsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO mandar para uma ferramenta de controle de erro
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})
// const prisma = new PrismaClient()

// prisma.user.create({
//   data:{
//     name: "Matheus Santos",
//     email: "matheusdsantos@gmail.com",

//   },
// })
