//@ts-nocheck
import { Driver } from '../Driver';
import { DriverModel } from '../schemas/DriverSchema'
export class DriverRepository implements IDriverRepository { 
  
  async createDriver(driver: Driver) {
    const output = await DriverModel.create(driver);
    return output.id;
  }
}

export interface IDriverRepository {
  createDriver(driver: Driver): Promise<string>
}