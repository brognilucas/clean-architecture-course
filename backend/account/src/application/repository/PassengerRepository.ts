import Passenger from "../../domain/passenger/Passenger"

export default interface PassengerRepository {
  createPassenger(passenger: Passenger): Promise<void>

  getPassengerById(id: string): Promise<Passenger>
}