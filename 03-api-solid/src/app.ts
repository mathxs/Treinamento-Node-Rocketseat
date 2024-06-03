import fastify from 'fastify'
import { appRoutes } from 'http/routes'

export const app = fastify()
app.register(appRoutes)


// const prisma = new PrismaClient()

// prisma.user.create({
//   data:{
//     name: "Matheus Santos",
//     email: "matheusdsantos@gmail.com",

//   },
// })