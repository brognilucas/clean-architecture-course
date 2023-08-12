import DriverRepository from "../repository/DriverRepository";
import PassengerRepository from "../repository/PassengerRepository";
import RideRepository from "../repository/RideRepository";

export default interface RepositoryFactory { 
  createPassengerRepository(): PassengerRepository
  createDriverRepository(): DriverRepository
}