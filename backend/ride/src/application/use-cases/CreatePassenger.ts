import Passenger from "../../domain/Passenger";
import PassengerRepository from "../repository/PassengerRepository";

export default class CreatePassenger {
  constructor(
    private readonly passengerRepository: PassengerRepository,
  ) {}
  
  async execute(input: Input): Promise<Output> {
    const passenger = Passenger.create(input.document, input.name, input.email);
    await this.passengerRepository.createPassenger(passenger)
    return {
      passengerId: passenger.id
    }
  }
}

type Input = {
  name: string;
  email: string;
  document: string;
}

type Output = {
  passengerId: string;
}