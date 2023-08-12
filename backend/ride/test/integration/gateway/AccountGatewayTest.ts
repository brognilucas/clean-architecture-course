import { DriverDTO } from "../../../src/infra/gateway/AccountDTO/DriverDTO";
import { PassengerDTO } from "../../../src/infra/gateway/AccountDTO/PassengerDTO";
import AccountGateway from "../../../src/infra/gateway/AccountGateway";

export default class AccountGatewayTest implements AccountGateway {
  passengers: PassengerDTO[] = [
    { passengerId: 'random-passenger-id', name: 'PassengerTest' }
  ];
  drivers: DriverDTO[] = [
    { driverId: 'random-driver-id', name: 'Random Driver name', carPlate: 'AAA8888' }
  ];


  async getPassenger(passengerId: string): Promise<PassengerDTO | null> {
    return this.passengers.find((p) => passengerId === p.passengerId) ?? null
  }
  
  async getDriver(driverId: string): Promise<DriverDTO | null> {
      return this.drivers.find((driver) => driver.driverId === driverId) ?? null
  }

}