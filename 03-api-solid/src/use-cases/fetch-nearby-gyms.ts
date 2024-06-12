import { Gym } from '@prisma/client'
import { GymsRepositoty } from '@/repositories/gyms-repository'

interface FetchNearbyGymUserCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymUserCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymUserCase {
  constructor(private gymRepositoty: GymsRepositoty) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymUserCaseRequest): Promise<FetchNearbyGymUserCaseResponse> {
    const gyms = await this.gymRepositoty.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
