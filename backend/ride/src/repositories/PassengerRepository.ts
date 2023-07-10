import { Passenger } from '../Passenger';
import { PassengerModel } from '../schemas/PassengerSchema'
export class PassengerRepository implements IPassengerRepository { 
  async createPassenger(Passenger: Passenger): Promise<string> {
    const output = await PassengerModel.create(Passenger);
    return output.id;
  }

  async getPassengerById(id: string): Promise<Passenger | null> {
    const output = await PassengerModel.findById(id);
    return output;
  }


}

export interface IPassengerRepository {
  createPassenger(passenger: Passenger): Promise<string>

  getPassengerById(id: string): Promise<Passenger | null>
}