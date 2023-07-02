//@ts-nocheck
import { IPassengerRepository, PassengerRepository } from "./repositories/PassengerRepository";
import Document from "./Document";

export class Passenger { 
  constructor(
    private readonly passengerRepository: IPassengerRepository = new PassengerRepository()
  ) {}

  async createPassenger(passenger) {
    if (!Document.validate(passenger.document)) {
      throw new Error("Invalid document");
    }
    const passenger_id = await this.passengerRepository.createPassenger(passenger)
    return passenger_id
  }
}

export interface PassengerInput {
  name: string;
  email: string;
  document: string;
}

export interface PassengerOutput {
  id: string;
  name: string;
  email: string;
  document: string;
  createdAt: Date;
  updatedAt: Date;
}