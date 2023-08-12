import RepositoryFactory from "../../application/factory/RepositoryFactory";
import RideRepository from "../../application/repository/RideRepository";
import RideRepositoryDatabase from "../repositories/RideRepositoryDatabase";

export default class RepositoryFactoryDatabase implements RepositoryFactory {
  private rideRepository?: RideRepository;

  createRideRepository(): RideRepository {
    if (!this.rideRepository){
      this.rideRepository = new RideRepositoryDatabase();
    }
    return this.rideRepository;
  }

}