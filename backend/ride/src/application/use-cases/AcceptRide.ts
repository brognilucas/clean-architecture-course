import { RideStatus } from "../../domain/ride/RideStatus";
import DriverRepository from "../repository/DriverRepository";
import RideRepository from "../repository/RideRepository";
import RepositoryFactory from "../factory/RepositoryFactory";

export class AcceptRide {
  private rideRepository: RideRepository;
  private driverRepository: DriverRepository;
  constructor(
    repositoryFactory: RepositoryFactory
  ) {
    this.rideRepository = repositoryFactory.createRideRepository();
    this.driverRepository = repositoryFactory.createDriverRepository();
  }

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