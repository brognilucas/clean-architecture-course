import Ride from "../Ride";
import {RideRepository, IRideRepository} from "../repositories/RideRepository";
import { Location } from '../Location';
import { IPassengerRepository, PassengerRepository } from "../repositories/PassengerRepository";

export default class RequestRide { 
  constructor(
    private rideRepository: IRideRepository = new RideRepository(),
    private passengerRepository: IPassengerRepository = new PassengerRepository()
  ){}

  async execute(body: RideInput){
    const { from, to, passenger_id } = body;
    const ride = new Ride(from, to, passenger_id);
    const passenger = await this.passengerRepository.getPassengerById(passenger_id);
    if (!passenger) throw new Error('Invalid passenger id');
    const ride_id = await this.rideRepository.createRide(ride);
    return ride_id;
  }
}

export interface RideInput { 
  from: Location;
  to: Location;
  passenger_id: string;
}