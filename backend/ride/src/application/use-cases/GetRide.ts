import RideRepository from "../repository/RideRepository";
export default class GetRide {
  constructor(private rideRepository: RideRepository) { }

  async execute(id: string) {
    const ride = await this.rideRepository.getRideById(id)
    if (!ride) {
      throw new Error("Invalid ride id")
    }
    
    return ride;
  }
}