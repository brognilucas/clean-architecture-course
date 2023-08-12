import RideRepository from "../repository/RideRepository";

export default interface RepositoryFactory {
  createRideRepository(): RideRepository
}