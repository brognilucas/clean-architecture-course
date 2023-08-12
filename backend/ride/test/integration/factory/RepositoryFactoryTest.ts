import RepositoryFactory from "../../../src/application/factory/RepositoryFactory";
import RideRepository from "../../../src/application/repository/RideRepository";
import RideRepositoryTest from "../repositories/RideRepositoryTest";

export default class RepositoryFactoryTest implements RepositoryFactory {
  private rideRepository?: RideRepository;

  createRideRepository(): RideRepository {
    if (!this.rideRepository) {
      this.rideRepository = new RideRepositoryTest();
    }
    return this.rideRepository;
  }

}