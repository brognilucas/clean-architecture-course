import Coord from "../../domain/distance/Coord";
import RepositoryFactory from "../factory/RepositoryFactory";
import RideRepository from "../repository/RideRepository";

export default class AddSegmentToRide  { 
  private rideRepository: RideRepository
  constructor(repositoryFactory: RepositoryFactory) { 
    this.rideRepository = repositoryFactory.createRideRepository();
  }

  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.getRideById(input.rideId);
    ride.addSegment(input.from, input.to, input.date);
    await this.rideRepository.updateRide(ride);
  }
}


type Input = {
  rideId: string,
  from: Coord,
  to: Coord,
  date: Date,
}
