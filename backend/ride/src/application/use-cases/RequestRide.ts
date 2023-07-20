import { PassengerRepositoryDatabase } from "../../infra/repositories/PassengerRepositoryDatabase";
import RideRepositoryDatabase from "../../infra/repositories/RideRepositoryDatabase";
import Ride from "../../domain/Ride";
import PassengerRepository from "../repository/PassengerRepository";
import RideRepository from "../repository/RideRepository";
import Coord from '../../domain/Coord';

export default class RequestRide { 
  constructor(
    private rideRepository: RideRepository,
    private passengerRepository: PassengerRepository,
  ){}

  async execute(body: Input): Promise<Output>{
    const { from, to, passengerId } = body;
    const passenger = await this.passengerRepository.getPassengerById(passengerId);
    if (!passenger) throw new Error('Invalid passenger id');
    const ride = Ride.create(
      new Coord(from.lat, from.long),
      new Coord(to.lat, to.long),
      passengerId
    );
    await this.rideRepository.createRide(ride);
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
