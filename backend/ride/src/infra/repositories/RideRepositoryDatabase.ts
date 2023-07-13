//@ts-nocheck
import Ride from '../../application/domain/Ride';
import { RideModel } from '../schemas/RideSchema'
import { RideStatus } from '../../application/domain/RideStatus';
export default class RideRepositoryDatabase implements RideRepository {
  async createRide(ride: Ride): Promise<void> {
    await RideModel.create(ride)
  }

  async acceptRide(rideId: string, driverId: string): Promise<Ride> {
    const ride = await RideModel.findOne({ id: rideId });
    ride?.driverId = driverId;
    ride?.status = RideStatus.ACCEPTED;
    ride?.acceptedAt = new Date();
    await ride?.save();
    return new Ride(
      ride?.id,
      ride?.from,
      ride?.to,
      ride?.passengerId,
      ride?.driverId,
      ride?.status,
      ride?.requestedAt,
      ride?.acceptedAt,
    );
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
      ride.acceptedAt
    );
  }
}
