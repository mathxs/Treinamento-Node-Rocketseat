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
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
