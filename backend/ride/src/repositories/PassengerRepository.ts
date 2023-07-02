//@ts-nocheck
import { PassengerModel } from '../schemas/PassengerSchema'
export class PassengerRepository implements IPassengerRepository { 
  
  async createPassenger(Passenger) {
    const output = await PassengerModel.create(Passenger);
    return output.id;
  }
}

export interface IPassengerRepository {
  createPassenger(passenger): Promise<string>
}