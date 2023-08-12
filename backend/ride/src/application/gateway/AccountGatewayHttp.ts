import { DriverDTO } from "../../infra/gateway/AccountDTO/DriverDTO";
import { PassengerDTO } from "../../infra/gateway/AccountDTO/PassengerDTO";
import AccountGateway from "../../infra/gateway/AccountGateway";
import HttpClient from "../adapters/HttpClient";

export default class AccountGatewayHttp implements AccountGateway {
  defaultURL = 'http://localhost:3001'

  constructor(private readonly httpClient: HttpClient) { }

  async getPassenger(passengerId: string): Promise<PassengerDTO | null> {
    const passenger = await this.httpClient.get(`${this.defaultURL}/passengers/${passengerId}`, {})
    return passenger ?? null
  }

  async getDriver(driverId: string): Promise<DriverDTO | null> {
    const driver = await this.httpClient.get(`${this.defaultURL}/drivers/${driverId}`, {})
    return driver ?? null
  }
}