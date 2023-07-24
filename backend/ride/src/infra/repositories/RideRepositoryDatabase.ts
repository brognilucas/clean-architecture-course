//@ts-nocheck
import Ride from '../../domain/ride/Ride';
import { RideModel } from '../schemas/RideSchema'
export default class RideRepositoryDatabase implements RideRepository {
  async createRide(ride: Ride): Promise<void> {
    await RideModel.create(ride)
  }

  async updateRide(ride: Ride) {
    await RideModel.updateOne({ id: ride.id }, ride);
  }

  async getRideById(rideId: string): Promise<Ride> {
    const ride = await RideModel.findOne({ id: rideId });
    if (!ride) {
      throw new Error("Invalid ride id");
    }
    return new Ride(
      ride.id,
      ride.from, 
      ride.to, 
      ride.passenger_id, 
      ride.driverId, 
      ride.status, 
      ride.requestedAt, 
      ride.acceptedAt,
      ride.startedAt,
      ride.segments
    );
  }
}
