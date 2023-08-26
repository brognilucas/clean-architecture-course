import Ride from "../../domain/ride/Ride";
import Segment from "../../domain/ride/Segment";

export default interface RideRepository {
  createRide(ride: Ride): Promise<void>;
  getRideById(rideId: string): Promise<Ride>;
  updateRide(ride: Ride): Promise<void>;
  addSegmentToRide(ride: Ride, segment: Segment): Promise<void>
}