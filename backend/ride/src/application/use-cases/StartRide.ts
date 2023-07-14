import Location from "../../domain/Location";
import { RideStatus } from "../../domain/RideStatus";
import RideRepositoryDatabase from "../../infra/repositories/RideRepositoryDatabase";
import RideRepository from "../repository/RideRepository";

export default class StartRide { 
  constructor(
    private readonly rideRepository: RideRepository = new RideRepositoryDatabase()
  ){}

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.getRideById(input.rideId); 
    ride.start();
    await this.rideRepository.updateRide(ride);
    return {
      rideId: ride.id,
      status: ride.status,
      startedAt: ride.startedAt!
    }
  }
}

type Input = {
  rideId: string;
  from: Location
}

type Output = {
  rideId: string;
  status: RideStatus,
  startedAt: Date;
}