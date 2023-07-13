import Passenger from "../domain/Passenger"

export default interface PassengerRepository {
  createPassenger(passenger: Passenger): Promise<void>

  getPassengerById(id: string): Promise<Passenger>
}