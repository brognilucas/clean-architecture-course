import PassengerRepository from "../../../src/application/repository/PassengerRepository";
import Passenger from "../../../src/domain/passenger/Passenger";

export default class PassengerRepositoryTest implements PassengerRepository {
  passengers = new Map();

  async createPassenger(passenger: Passenger): Promise<void> {
    this.passengers.set(passenger.id, passenger);
  }
  
  async getPassengerById(id: string): Promise<Passenger> {
    return this.passengers.get(id)
  } 
}