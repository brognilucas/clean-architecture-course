import Passenger from "../entities/Passenger"

export default interface CreatePassengerGateway { 
  save(passenger: Passenger): Promise<OutputCreatePassenger>
}

type OutputCreatePassenger = {
  passengerId: string
}