import Passenger from "../../entities/Passenger"

export default interface PassengerGateway { 
  save(passenger: Passenger): Promise<OutputCreatePassenger>
}

type OutputCreatePassenger = {
  passengerId: string
}