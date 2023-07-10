import { RideStatus } from "../RideStatus";
import { DriverRepository, IDriverRepository } from "../repositories/DriverRepository";
import { IRideRepository, RideRepository } from "../repositories/RideRepository";

export class AcceptRide { 
 constructor(
    private rideRepository: IRideRepository = new RideRepository(),
    private driverRepository: IDriverRepository = new DriverRepository()
 ){}
 
  async execute(body: AcceptRideInput){
    const ride = await this.rideRepository.getRideById(body.ride_id);
    if(!ride) throw new Error('Invalid ride id');
    if (ride.status !== RideStatus.WAITING_DRIVER) throw new Error('Ride is not waiting for a driver');
    const driver = await this.driverRepository.getDriverById(body.driver_id);
    if(!driver) throw new Error('Invalid driver id');
    const {
      id,
      driver_id,
      status
    } = await this.rideRepository.acceptRide(body.ride_id, body.driver_id);
    return {
      ride_id: id,
      driver_id,
      status
    };
  }
}

export type AcceptRideOutput = {
  ride_id: string;
  driver_id: string;
  status: RideStatus;
}

export type AcceptRideInput = { 
  ride_id: string;
  driver_id: string;
}