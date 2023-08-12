import { DriverDTO } from "./AccountDTO/DriverDTO"
import { PassengerDTO } from "./AccountDTO/PassengerDTO"

export default interface AccountGateway { 
  getPassenger(passengerId: string): Promise<PassengerDTO | null>
  getDriver(driverId: string): Promise<DriverDTO | null>
}