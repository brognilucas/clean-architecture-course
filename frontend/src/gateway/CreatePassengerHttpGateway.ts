import HttpClient from "../adapters/HttpClient";
import Passenger from "../entities/Passenger";
import CreatePassengerGateway from "./CreatePassengerGateway";

export default class CreatePassgengerHttpGateway implements CreatePassengerGateway { 

  constructor(
    private readonly httpClient: HttpClient
  ){}
  
  async save(passenger: Passenger) {
    return await this.httpClient.post('http://localhost:3000/passengers', passenger)
  }
}