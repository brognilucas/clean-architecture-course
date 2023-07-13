import Driver from "../domain/Driver";
import DriverRepositoryDatabase from "../../infra/repositories/DriverRepositoryDatabase";
import DriverRepository from "../repository/DriverRepository";
export class CreateDriver {
  constructor(
    private readonly driverRepository: DriverRepository = new DriverRepositoryDatabase()
  ) { }

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