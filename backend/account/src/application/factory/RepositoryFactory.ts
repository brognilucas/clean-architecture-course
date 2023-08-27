import DriverRepository from "../repository/DriverRepository";
import PassengerRepository from "../repository/PassengerRepository";

export default interface RepositoryFactory { 
  createPassengerRepository(): PassengerRepository
  createDriverRepository(): DriverRepository
}