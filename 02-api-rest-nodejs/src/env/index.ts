import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

// export const env = envSchema.parse(process.env)
// a linha cima é automatico pela bliblioteca, e embaixo e a versão customizada
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalido', _env.error.format())
  throw new Error('Invalido')
}

export const env = _env.data
