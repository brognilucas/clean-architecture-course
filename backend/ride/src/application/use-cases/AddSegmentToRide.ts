import Coord from "../../domain/distance/Coord";
import RideRepository from "../repository/RideRepository";

export default class AddSegmentToRide  { 
  constructor(private repository: RideRepository) { }

  async execute(input: Input): Promise<void> {
    const ride = await this.repository.getRideById(input.rideId);
    ride.addSegment(input.from, input.to, input.date);
    await this.repository.updateRide(ride);
  }
}


type Input = {
  rideId: string,
  from: Coord,
  to: Coord,
  date: Date,
}
