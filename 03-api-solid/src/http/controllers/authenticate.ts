import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authencicate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authencicateBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authencicateBodySchema.parse(request.body)
  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
    // return reply.status(500).send() //TODO fix me
  }

  return reply.status(200).send()
}
