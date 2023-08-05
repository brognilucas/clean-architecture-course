import RideRepository from "../../../src/application/repository/RideRepository";
import Ride from "../../../src/domain/ride/Ride";

export default class RideRepositoryTest implements RideRepository {
  private rides = new Map(); 
  
  async createRide(ride: Ride): Promise<void> {
    this.rides.set(ride.id, ride);
  }

  async getRideById(rideId: string): Promise<Ride> {
    return this.rides.get(rideId)
  }

  async updateRide(ride: Ride): Promise<void> {
    this.rides.set(ride.id, ride);
  } 
}