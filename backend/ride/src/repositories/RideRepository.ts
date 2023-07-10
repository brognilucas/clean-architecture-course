import Ride from '../Ride';
import { RideModel } from '../schemas/RideSchema'

export class RideRepository {
  async createRide(ride: Ride) {
    const { id } = await RideModel.create(ride)

    return id;
  }
}

export interface IRideRepository { 
  createRide(ride: Ride): Promise<string>;
}