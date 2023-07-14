import RideRepositoryDatabase from "../../infra/repositories/RideRepositoryDatabase";
import Ride from "../../domain/Ride";
import RideRepository from "../repository/RideRepository";

export default class GetRide {
  constructor(private rideRepository: RideRepository = new RideRepositoryDatabase()) { }

  async execute(id: string) {
    const ride = await this.rideRepository.getRideById(id)
    if (!ride) {
      throw new Error("Invalid ride id")
    }
    const output = new Ride(
      ride.id,
      ride.from,
      ride.to,
      ride.passengerId,
      ride.driverId,
      ride.status,
      ride.requestedAt,
      ride.acceptedAt,
    )
    return output;
  }
}