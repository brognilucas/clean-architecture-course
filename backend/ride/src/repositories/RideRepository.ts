//@ts-nocheck
import Ride from '../Ride';
import { RideModel } from '../schemas/RideSchema'
import { RideStatus } from '../RideStatus';
export class RideRepository implements IRideRepository {
  async createRide(ride: Ride) {
    const { id } = await RideModel.create(ride)

    return id;
  }

  async acceptRide(ride_id: string, driver_id: string): Promise<Ride> {
    const ride = await RideModel.findById(ride_id);
    ride?.driver_id = driver_id;
    ride?.status = RideStatus.ACCEPTED;
    await ride?.save();
    return ride;
  }

  async getRideById(ride_id: string): Promise<Ride | null> {
    const ride = await RideModel.findById(ride_id);

    return ride as Ride;
  }
}

export interface IRideRepository {
  createRide(ride: Ride): Promise<string>;
  acceptRide(ride_id: string, driver_id: string): Promise<Ride>;
  getRideById(ride_id: string): Promise<Ride | null>;
}