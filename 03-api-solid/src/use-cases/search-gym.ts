import { Gym } from '@prisma/client'
import { GymsRepositoty } from '@/repositories/gyms-repository'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymRepositoty: GymsRepositoty) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymRepositoty.searchMany(query, page)

    return { gyms }
  }
}
