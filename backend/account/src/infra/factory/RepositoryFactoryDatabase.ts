import RepositoryFactory from "../../application/factory/RepositoryFactory";
import DriverRepository from "../../application/repository/DriverRepository";
import PassengerRepository from "../../application/repository/PassengerRepository";
import DatabaseConnection from "../db/DatabaseConnect";
import DriverRepositoryPostgres from "../repositories/DriverRepositoryPostgres";
import PassengerRepositoryPostgres from "../repositories/PassengerRepositoryPostgres";

export default class RepositoryFactoryDatabase implements RepositoryFactory {
  constructor(private connection: DatabaseConnection){}

  private passengerRepository?: PassengerRepository;
  private driverRepository?: DriverRepository;

  createPassengerRepository(): PassengerRepository {
    if (!this.passengerRepository){
      this.passengerRepository = new PassengerRepositoryPostgres(this.connection);
    }
    return this.passengerRepository
  }
  createDriverRepository(): DriverRepository {
    if (!this.driverRepository){ 
      this.driverRepository = new DriverRepositoryPostgres(this.connection)
    }
    return this.driverRepository;
  }

}