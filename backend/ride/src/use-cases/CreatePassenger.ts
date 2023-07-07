import { Passenger, PassengerInput } from "../Passenger";
import { IPassengerRepository, PassengerRepository } from "../repositories/PassengerRepository";

export default class CreatePassenger {
  constructor(
    private readonly passengerRepository: IPassengerRepository = new PassengerRepository()
  ) {}
  
  async execute(input: PassengerInput) {
    const passenger = new Passenger(input.document, input.name, input.email);
    const passenger_id = await this.passengerRepository.createPassenger(passenger)
    return passenger_id
  }
}