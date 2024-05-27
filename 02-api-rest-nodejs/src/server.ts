/*
interface User {
  birthYear: number
}

function calculateAgeOfUser(user: User) {
  return new Date().getFullYear() - user.birthYear
}

calculateAgeOfUser({
  birthYear: 1994,
})
*/
import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
    host: 'RENDER' in process.env ? '0.0.0.0' : 'localhost',
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
