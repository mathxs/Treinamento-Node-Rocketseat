import { Gym } from '@prisma/client'
import { GymsRepositoty } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepositoty {
  public items: Gym[] = []

  async findByID(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
