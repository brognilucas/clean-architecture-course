import RepositoryFactory from "../../application/factory/RepositoryFactory";
import DriverRepository from "../../application/repository/DriverRepository";
import PassengerRepository from "../../application/repository/PassengerRepository";
import RideRepository from "../../application/repository/RideRepository";
import DriverRepositoryDatabase from "../repositories/DriverRepositoryDatabase";
import { PassengerRepositoryDatabase } from "../repositories/PassengerRepositoryDatabase";
import RideRepositoryDatabase from "../repositories/RideRepositoryDatabase";

export default class RepositoryFactoryDatabase implements RepositoryFactory{
  createPassengerRepository(): PassengerRepository {
    return new PassengerRepositoryDatabase();
  }
  createDriverRepository(): DriverRepository {
    return new DriverRepositoryDatabase();
  }
  createRideRepository(): RideRepository {
    return new RideRepositoryDatabase();
  }

}