import Coord from "../../domain/distance/Coord";
import Ride from "../../domain/ride/Ride";
import { RideStatus } from "../../domain/ride/RideStatus";
import Queue from "../../infra/queue/Queue";
import RepositoryFactory from "../factory/RepositoryFactory";
import RideRepository from "../repository/RideRepository";
import { MessageTypes } from "../types/MessageTypes";

export default class StartRide { 
  private rideRepository: RideRepository; 
  
  constructor(repositoryFactory: RepositoryFactory, private queue: Queue){
    this.rideRepository = repositoryFactory.createRideRepository();
    if (!queue) {
      throw new Error('Invalid queue');
    }
  }

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.getRideById(input.rideId); 
    if (!ride) { 
      throw new Error('Invalid ride id');
    }
    ride.start();
    await this.rideRepository.updateRide(ride);


    await this.queue.publish(MessageTypes.RIDE_STARTED, {
      rideId: ride.id,
      status: ride.status,
      startedAt: ride.startedAt!
    }); 
    
    return {
      rideId: ride.id,
      status: ride.status,
      startedAt: ride.startedAt!
    }
  }
}

type Input = {
  rideId: string;
  from: Coord
}

type Output = {
  rideId: string;
  status: RideStatus,
  startedAt: Date;
}