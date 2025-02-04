import RepositoryFactory from "../../../src/application/factory/RepositoryFactory";
import DriverRepository from "../../../src/application/repository/DriverRepository";
import PassengerRepository from "../../../src/application/repository/PassengerRepository";
import DriverRepositoryTest from "../repositories/DriverRepositoryTest";
import PassengerRepositoryTest from "../repositories/PassengerRepositoryTest";

export default class RepositoryFactoryTest implements RepositoryFactory {
  private passengerRepository?: PassengerRepository;
  private driverRepository?: DriverRepository;

  createPassengerRepository(): PassengerRepository {
    if (!this.passengerRepository) {
      this.passengerRepository = new PassengerRepositoryTest();
    }
    return this.passengerRepository;
  }
  createDriverRepository(): DriverRepository {
    if (!this.driverRepository) {
      this.driverRepository = new DriverRepositoryTest();
    }
    return this.driverRepository
  }
 
}