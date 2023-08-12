import RepositoryFactory from "../factory/RepositoryFactory";
import DriverRepository from "../repository/DriverRepository";

export default class GetDriver {
  private driverRepository: DriverRepository

  constructor(repoFactory: RepositoryFactory) {
    this.driverRepository = repoFactory.createDriverRepository();
  }

  async execute(input: Input): Promise<Output> {
    const driver = await this.driverRepository.getDriverById(input.driverId);
    if (!driver) {
      throw new Error("Driver not found")
    }
    return {
      driverId: driver.id,
      name: driver.name,
      carPlate: driver.carPlate,
      email: driver.email,
      document: driver.document
    }
  }
}

type Input = {
  driverId: string;
}

type Output = {
  driverId: string,
  name: string,
  carPlate: string,
  email: string,
  document: string
}