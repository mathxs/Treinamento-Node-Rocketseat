import { Gym, Prisma } from '@prisma/client'

export interface GymsRepositoty {
  findByID(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}