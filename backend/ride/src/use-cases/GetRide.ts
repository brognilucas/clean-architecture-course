import Ride from "../Ride";
import { IRideRepository, RideRepository } from "../repositories/RideRepository";

export default class GetRide {
  constructor(private rideRepository: IRideRepository = new RideRepository()) { }

  async execute(id: string) {
    const ride = await this.rideRepository.getRideById(id)
    if (!ride) {
      throw new Error("Invalid ride id")
    }

    const output = new Ride(
      ride.from,
      ride.to,
      ride.passenger_id,
      ride.driver_id,
      ride.status,
      ride.requestedAt,
      ride.acceptedAt,
      ride.id,
    )

    return output;
  }
}