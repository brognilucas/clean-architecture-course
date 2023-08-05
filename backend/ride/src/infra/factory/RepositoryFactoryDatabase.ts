import RepositoryFactory from "../../application/factory/RepositoryFactory";
import DriverRepository from "../../application/repository/DriverRepository";
import PassengerRepository from "../../application/repository/PassengerRepository";
import RideRepository from "../../application/repository/RideRepository";
import DriverRepositoryDatabase from "../repositories/DriverRepositoryDatabase";
import { PassengerRepositoryDatabase } from "../repositories/PassengerRepositoryDatabase";
import RideRepositoryDatabase from "../repositories/RideRepositoryDatabase";

export default class RepositoryFactoryDatabase implements RepositoryFactory {
  private passengerRepository?: PassengerRepository;
  private driverRepository?: DriverRepository;
  private rideRepository?: RideRepository;

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
  createRideRepository(): RideRepository {
    if (!this.rideRepository){
      this.rideRepository = new RideRepositoryDatabase();
    }
    return this.rideRepository;
  }

}