import RideRepository from "../../../src/application/repository/RideRepository";
import Ride from "../../../src/domain/ride/Ride";
import Segment from "../../../src/domain/ride/Segment";

export default class RideRepositoryTest implements RideRepository {
  async addSegmentToRide(ride: Ride, segment: Segment): Promise<void> {
    const segments = this.segments.get(ride.id) ?? []; 
    segments.push(segment);
    this.segments.set(ride.id, segments); 
  }

  private segments = new Map();
  private rides = new Map();

  async createRide(ride: Ride): Promise<void> {
    this.rides.set(ride.id, ride);
  }

  async getRideById(rideId: string): Promise<Ride> {
    const ride = this.rides.get(rideId)
    const segments = this.segments.get(ride.id)
    return new Ride(
      ride.id,
      ride.from, 
      ride.to, 
      ride.passengerId, 
      ride.driverId, 
      ride.status, 
      ride.requestedAt,
      ride.acceptedAt,
      ride.startedAt, 
      segments, 
      ride.completedAt
    )
  }

  async updateRide(ride: Ride): Promise<void> {
    this.rides.set(ride.id, ride);
  }
}