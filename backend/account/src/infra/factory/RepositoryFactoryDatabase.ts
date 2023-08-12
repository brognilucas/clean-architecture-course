import RepositoryFactory from "../../application/factory/RepositoryFactory";
import DriverRepository from "../../application/repository/DriverRepository";
import PassengerRepository from "../../application/repository/PassengerRepository";
import DriverRepositoryDatabase from "../repositories/DriverRepositoryDatabase";
import { PassengerRepositoryDatabase } from "../repositories/PassengerRepositoryDatabase";

export default class RepositoryFactoryDatabase implements RepositoryFactory {
  private passengerRepository?: PassengerRepository;
  private driverRepository?: DriverRepository;

  createPassengerRepository(): PassengerRepository {
    if (!this.passengerRepository){
      this.passengerRepository = new PassengerRepositoryDatabase();
    }
    return this.passengerRepository
  }
  createDriverRepository(): DriverRepository {
    if (!this.driverRepository){ 
      this.driverRepository = new DriverRepositoryDatabase();
    }
    return this.driverRepository;
  }

}