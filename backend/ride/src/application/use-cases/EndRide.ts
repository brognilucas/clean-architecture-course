import RepositoryFactory from "../factory/RepositoryFactory";
import RideRepository from "../repository/RideRepository";

export default class EndRide { 
  private rideRepository: RideRepository; 
  
  constructor(repositoryFactory: RepositoryFactory){
    this.rideRepository = repositoryFactory.createRideRepository();
  }

  async execute(input: Input): Promise<Output>{ 
    const ride = await this.rideRepository.getRideById(input.rideId);
    ride.end();
    await this.rideRepository.updateRide(ride); 
    return {
      rideId: ride.id,
      status: ride.status,
      completedAt: ride.completedAt!,
      driverId: ride.driverId!
    }
  }
}

type Input = { 
  rideId: string
}

type Output = {
  rideId: string;
  status: string;
  completedAt: Date;
  driverId: string;
}