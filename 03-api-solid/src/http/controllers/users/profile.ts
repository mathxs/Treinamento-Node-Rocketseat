import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-ṕrofile'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    ...user,
    password_has: undefined,
  })
}
