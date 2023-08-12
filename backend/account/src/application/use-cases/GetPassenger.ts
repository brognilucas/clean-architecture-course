import RepositoryFactory from "../factory/RepositoryFactory";
import PassengerRepository from "../repository/PassengerRepository";

export default class GetPassenger {
  private passengerRepository: PassengerRepository

  constructor(repoFactory: RepositoryFactory) {
    this.passengerRepository = repoFactory.createPassengerRepository();
  }

  async execute(input: Input): Promise<Output> {
    const passenger = await this.passengerRepository.getPassengerById(input.passengerId);
    if (!passenger) {
      throw new Error("Passenger not found")
    }
    return {
      passengerId: passenger.id,
      name: passenger.name,
      email: passenger.email,
      document: passenger.document
    }
  }
}

type Input = {
  passengerId: string;
}

type Output = {
  passengerId: string,
  name: string,
  email: string,
  document: string
}