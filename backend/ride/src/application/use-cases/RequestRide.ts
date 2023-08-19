import Ride from "../../domain/ride/Ride";
import RideRepository from "../repository/RideRepository";
import Coord from '../../domain/distance/Coord';
import RepositoryFactory from "../factory/RepositoryFactory";
import AccountGateway from "../../infra/gateway/AccountGateway";
import Queue from "../../infra/queue/Queue";
import { MessageTypes } from "../types/MessageTypes";

export default class RequestRide { 
  private rideRepository: RideRepository; 
  private accountGateway: AccountGateway; 

  constructor(repositoryFactory: RepositoryFactory, accountGateway: AccountGateway, private queue: Queue){
    this.rideRepository = repositoryFactory.createRideRepository();
    this.accountGateway = accountGateway;
  }

  async execute(body: Input): Promise<Output>{
    const { from, to, passengerId } = body;
    const passenger = await this.accountGateway.getPassenger(passengerId);
    if (!passenger) throw new Error('Invalid passenger id');
    const ride = Ride.create(
      new Coord(from.lat, from.long),
      new Coord(to.lat, to.long),
      passengerId
    );
    await this.rideRepository.createRide(ride);
    
    await this.queue.publish(MessageTypes.RIDE_REQUESTED, {
      rideId: ride.id,
      passengerId: ride.passengerId,
      requestedAt: ride.requestedAt,
    });
    
    return {
      rideId: ride.id
    };
  }
}

type Input = { 
  from: {
    lat: number;
    long: number;
  };
  to: {
    lat: number;
    long: number;
  };
  passengerId: string;
}

type Output = {
  rideId: string;
}
