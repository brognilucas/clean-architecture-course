import HttpClient from "../../adapters/HttpClient";
import Passenger from "../../entities/Passenger";
import PassengerGateway from "./PassengerGateway";

export default class PassengerHttpGateway implements PassengerGateway { 

  constructor(
    private readonly httpClient: HttpClient
  ){}
  
  async save(passenger: Passenger) {
    return await this.httpClient.post('http://localhost:3000/passengers', passenger)
  }
}