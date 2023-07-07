import { Driver, DriverInput } from "../Driver";
import { DriverRepository, IDriverRepository } from "../repositories/DriverRepository";

export class CreateDriver { 
  constructor(
    private readonly driverRepository: IDriverRepository = new DriverRepository()
  ) {}

 async execute(input: DriverInput): Promise<string> {
    const driver = new Driver(
      input.document,
      input.name,
      input.email,
      input.carPlate
    )
    const driver_id = await this.driverRepository.createDriver(driver)
    return driver_id;
 }
}