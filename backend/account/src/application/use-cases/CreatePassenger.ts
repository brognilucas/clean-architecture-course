import Passenger from "../../domain/passenger/Passenger";
import RepositoryFactory from "../factory/RepositoryFactory";
import PassengerRepository from "../repository/PassengerRepository";

export default class CreatePassenger {

  private passengerRepository: PassengerRepository;
  constructor(repositoryFactory: RepositoryFactory) {
    this.passengerRepository = repositoryFactory.createPassengerRepository();
  }

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