import Passenger from '../../application/domain/Passenger';
import { PassengerModel } from '../schemas/PassengerSchema'
import PassengerRepository from '../../application/repository/PassengerRepository';

export class PassengerRepositoryDatabase implements PassengerRepository {
  async createPassenger(Passenger: Passenger): Promise<void> {
    await PassengerModel.create(Passenger);
  }

  async getPassengerById(id: string): Promise<Passenger> {
    const passenger = await PassengerModel.findOne({ id });
    if (!passenger) {
      throw new Error("Invalid passenger id");
    }

    return new Passenger(
      passenger.id,
      passenger.document,
      passenger.name,
      passenger.email,
    )
  }


}