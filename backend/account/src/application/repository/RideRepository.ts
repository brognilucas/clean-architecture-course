import Ride from "../../domain/ride/Ride";

export default interface RideRepository {
  createRide(ride: Ride): Promise<void>;
  getRideById(rideId: string): Promise<Ride>;
  updateRide(ride: Ride): Promise<void>;
}