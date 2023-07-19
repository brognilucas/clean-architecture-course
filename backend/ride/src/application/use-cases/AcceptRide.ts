import { RideStatus } from "../../domain/RideStatus";
import DriverRepositoryDatabase from "../../infra/repositories/DriverRepositoryDatabase";
import DriverRepository from "../repository/DriverRepository";
import RideRepositoryDatabase from "../../infra/repositories/RideRepositoryDatabase";
import RideRepository from "../repository/RideRepository";

export class AcceptRide {
  constructor(
    private rideRepository: RideRepository,
    private driverRepository: DriverRepository = new DriverRepositoryDatabase()
  ) { }

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.getRideById(input.rideId);
    const driver = await this.driverRepository.getDriverById(input.driverId);
    if (!driver) throw new Error('Driver not found');
    ride.accept(input.driverId); 
    await this.rideRepository.updateRide(ride);
    return {
      rideId: ride.id,
      driverId: ride.driverId!,
      status: ride.status,
    };
  }
}

export type Output = {
  rideId: string;
  driverId: string;
  status: RideStatus;
}

export type Input = {
  rideId: string;
  driverId: string;
}