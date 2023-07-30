import HttpClient from "../../adapters/HttpClient";
import Driver from "../../entities/Driver";

export default class DriverHttpGateway {
  constructor(
    readonly httpClient: HttpClient
  ) { }

  async save(driver: Driver) {
    const { driverId } = await this.httpClient.post('http://localhost:3000/drivers', driver)

    return { driverId }
  }
}