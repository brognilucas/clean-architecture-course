import { RideStatus } from "../../domain/ride/RideStatus";
import RideRepository from "../repository/RideRepository";
import RepositoryFactory from "../factory/RepositoryFactory";
import AccountGateway from "../../infra/gateway/AccountGateway";

export class AcceptRide {
  private rideRepository: RideRepository;
  private accountGateway: AccountGateway;
  constructor(
    repositoryFactory: RepositoryFactory,
    accountGateway: AccountGateway,
  ) {
    this.rideRepository = repositoryFactory.createRideRepository();
    this.accountGateway = accountGateway
  }

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.getRideById(input.rideId);
    const driver = await this.accountGateway.getDriver(input.driverId);
    if (!driver) throw new Error('Driver is invalid');
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