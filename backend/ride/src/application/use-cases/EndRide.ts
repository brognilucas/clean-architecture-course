import Queue from "../../infra/queue/Queue";
import RepositoryFactory from "../factory/RepositoryFactory";
import RideRepository from "../repository/RideRepository";
import { MessageTypes } from "../types/MessageTypes";

export default class EndRide {
  private rideRepository: RideRepository;

  constructor(repositoryFactory: RepositoryFactory, private queue: Queue) {
    this.rideRepository = repositoryFactory.createRideRepository();
  }

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.getRideById(input.rideId);
    ride.end();
    await this.rideRepository.updateRide(ride);
    await this.queue.publish(MessageTypes.RIDE_COMPLETED, {
      status: ride.status, 
      rideId: ride.id,
      completedAt: ride.completedAt
    });
    return {
      rideId: ride.id,
      status: ride.status,
      completedAt: ride.completedAt!,
      driverId: ride.driverId!
    }
  }
}

type Input = {
  rideId: string
}

type Output = {
  rideId: string;
  status: string;
  completedAt: Date;
  driverId: string;
}