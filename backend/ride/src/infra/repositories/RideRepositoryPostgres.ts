import RideRepository from "../../application/repository/RideRepository";
import Coord from "../../domain/distance/Coord";
import Ride from "../../domain/ride/Ride";
import DatabaseConnection from "../db/DatabaseConnect";

export default class RideRepositoryPostgres implements RideRepository {

  constructor(private connection: DatabaseConnection) { }

  async createRide(ride: Ride): Promise<void> {
    return await this.connection.query('INSERT INTO rides(id, from_lat, from_lng, to_lat, to_lng, passenger_id, driver_id, status, requested_at, accepted_at, started_at, completed_at) VALUES(${id}, ${from.lat}, ${from.long}, ${to.lat}, ${to.long}, ${passengerId}, ${driverId}, ${status}, ${requestedAt}, ${acceptedAt}, ${startedAt}, ${completedAt})', ride);
  }

  async getRideById(rideId: string): Promise<Ride> {
    const [ride] = await this.connection.query('SELECT * FROM rides WHERE id = $1', rideId);
    
    if (!ride){ 
      throw new Error("Invalid ride id");
    }

    return new Ride(
      ride.id, 
      new Coord(ride.from_lat, ride.from_lng), 
      new Coord(ride.to_lat, ride.to_lng), 
      ride.passenger_id,
      ride.driver_id,
      ride.status,
      ride.requested_at,
      ride.accepted_at,
      ride.started_at,
      [],
      ride.completed_at
    )
  }

  async updateRide(ride: Ride): Promise<void> {
    return this.connection.query('UPDATE rides SET driver_id = ${driverId}, status = ${status}, accepted_at = ${acceptedAt}, started_at = ${startedAt}, completed_at = ${completedAt} WHERE id = ${id}', ride);
  }

}