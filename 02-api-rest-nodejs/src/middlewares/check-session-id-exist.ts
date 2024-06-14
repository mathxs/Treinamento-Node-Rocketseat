import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExist(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const SessionId = request.cookies.sessionId
  if (!SessionId) {
    return reply.status(401).send({
      error: 'Unauthorized.',
    })
  }
}
