import Ride from "../../domain/Ride";

export default interface RideRepository {
  createRide(ride: Ride): Promise<void>;
  acceptRide(rideId: string, driverId: string): Promise<Ride>;
  getRideById(rideId: string): Promise<Ride>;
}