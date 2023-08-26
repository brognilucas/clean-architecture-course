import Coord from "../../domain/distance/Coord";
import Segment from "../../domain/ride/Segment";
import RepositoryFactory from "../factory/RepositoryFactory";
import RideRepository from "../repository/RideRepository";

export default class AddSegmentToRide  { 
  private rideRepository: RideRepository
  constructor(repositoryFactory: RepositoryFactory) { 
    this.rideRepository = repositoryFactory.createRideRepository();
  }

  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.getRideById(input.rideId);
    const segment = new Segment(input.from, input.to, new Date(input.date))
    await this.rideRepository.addSegmentToRide(ride, segment)
  }
}


type Input = {
  rideId: string,
  from: Coord,
  to: Coord,
  date: Date,
}
