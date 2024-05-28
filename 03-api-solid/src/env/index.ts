import 'dotenv/config'
import { z } from 'zod'

// define o objeto de validação com o zod
const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

// testa os dados vindos do process.env
const _env = envSchema.safeParse(process.env)

// caso não obtenha sucesso, é lançada um exceção e interrompe a aplicação
if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
