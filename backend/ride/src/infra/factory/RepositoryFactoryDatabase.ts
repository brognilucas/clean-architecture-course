import RepositoryFactory from "../../application/factory/RepositoryFactory";
import RideRepository from "../../application/repository/RideRepository";
import DatabaseConnection from "../db/DatabaseConnect";
import PostgresConnection from "../db/PostgresConnection";
import RideRepositoryPostgres from "../repositories/RideRepositoryPostgres";

export default class RepositoryFactoryDatabase implements RepositoryFactory {
  constructor(private readonly connection: DatabaseConnection){}
  
  private rideRepository?: RideRepository;

  createRideRepository(): RideRepository {
    if (!this.rideRepository){
      this.rideRepository = new RideRepositoryPostgres(this.connection);
    }
    return this.rideRepository;
  }

}