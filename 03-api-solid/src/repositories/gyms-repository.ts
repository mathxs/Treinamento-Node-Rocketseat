import { Gym } from '@prisma/client'

export interface GymsRepositoty {
  findByID(id: string): Promise<Gym | null>
}
