import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { transactionsRoutes } from './routes/transaction'

/*
app.get('/filtro_1000', async () => {
  const transactions = await knex('transactions')
    .where('amount', 1000)
    .select('*')
  return transactions
})
*/

export const app = fastify()
app.register(cookie)
app.register(transactionsRoutes, {
  prefix: 'transactions',
})
