import Driver from "../../domain/driver/Driver";
import RepositoryFactory from "../factory/RepositoryFactory";
import DriverRepository from "../repository/DriverRepository";
export class CreateDriver {
  private driverRepository: DriverRepository

  constructor(repositoryFactory: RepositoryFactory) {
    this.driverRepository = repositoryFactory.createDriverRepository();
  }

  async execute(input: Input): Promise<Output> {
    const driver = Driver.create(
      input.document,
      input.name,
      input.email,
      input.carPlate
    )
    await this.driverRepository.createDriver(driver)
    return { driverId: driver.id };
  }
}

type Output = {
  driverId: string
}

type Input = {
  name: string,
  email: string,
  document: string,
  carPlate: string,
}