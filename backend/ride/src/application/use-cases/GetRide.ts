import RepositoryFactory from "../factory/RepositoryFactory";
import RideRepository from "../repository/RideRepository";
export default class GetRide {
  private rideRepository: RideRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.rideRepository = repositoryFactory.createRideRepository();
  }

  async execute(id: string) {
    const ride = await this.rideRepository.getRideById(id)
    if (!ride) {
      throw new Error("Invalid ride id")
    }

    return ride;
  }
}