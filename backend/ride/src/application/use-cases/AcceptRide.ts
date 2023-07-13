import { RideStatus } from "../domain/RideStatus";
import DriverRepositoryDatabase from "../../infra/repositories/DriverRepositoryDatabase";
import DriverRepository from "../repository/DriverRepository";
import RideRepositoryDatabase from "../../infra/repositories/RideRepositoryDatabase";
import RideRepository from "../repository/RideRepository";

export class AcceptRide {
  constructor(
    private rideRepository: RideRepository = new RideRepositoryDatabase(),
    private driverRepository: DriverRepository = new DriverRepositoryDatabase()
  ) { }

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.getRideById(input.rideId);
    if (ride.status !== RideStatus.WAITING_DRIVER) throw new Error('Ride is not waiting for a driver');
    const driver = await this.driverRepository.getDriverById(input.driverId);
    if (!driver) throw new Error('Driver not found');
    const acceptedRide = await this.rideRepository.acceptRide(input.rideId, input.driverId);
    if (!acceptedRide.driverId) throw new Error('Unable to accept ride');
    return {
      rideId: acceptedRide.id,
      driverId: acceptedRide.driverId,
      status: acceptedRide.status,
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