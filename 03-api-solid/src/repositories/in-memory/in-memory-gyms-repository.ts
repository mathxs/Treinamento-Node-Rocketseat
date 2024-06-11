import { Gym, Prisma } from '@prisma/client'
import { GymsRepositoty } from '../gyms-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepositoty {
  public items: Gym[] = []

  async findByID(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longtitude: new Prisma.Decimal(data.longtitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)
    return gym
  }
}