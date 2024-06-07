import { Prisma, User } from '@prisma/client'

export interface UserRepositoty {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByID(id: string): Promise<User | null>
}
