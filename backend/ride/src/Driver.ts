import Document from "./Document"
import {DriverRepository, IDriverRepository} from "./repositories/DriverRepository"

export class Driver {
  constructor(
    private readonly driverRepository: IDriverRepository = new DriverRepository(),
  ) {}

  async createDriver(driver: DriverInput): Promise<string> {
    if (!Document.validate(driver.document)) {
      throw new Error("Invalid document");
    }
    const driverId = await this.driverRepository.createDriver(driver);
    return driverId;
  }
}

export interface DriverInput { 
  name: string,
  email: string,
  document: string, 
  carPlate: string,
}

export interface DriverOutput {
  id: string,
  name: string,
  email: string,
  document: string,
  carPlate: string,
  createdAt: Date,
  updatedAt: Date,
}