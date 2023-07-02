//@ts-nocheck
import { DriverModel } from '../schemas/DriverSchema'
export class DriverRepository implements IDriverRepository { 
  
  async createDriver(driver) {
    const output = await DriverModel.create(driver);

    return output.id;
  }
}

export interface IDriverRepository {
  createDriver(driver): Promise<string>
}