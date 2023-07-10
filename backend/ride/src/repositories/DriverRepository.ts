//@ts-nocheck
import { Driver } from '../Driver';
import { DriverModel } from '../schemas/DriverSchema'
export class DriverRepository implements IDriverRepository { 
  
  async createDriver(driver: Driver) {
    const output = await DriverModel.create(driver);
    return output.id;
  }

  async getDriverById(driver_id: string): Promise<Driver | null> {
    const driver = await DriverModel.findById(driver_id);
    return driver as Driver;
  }
}

export interface IDriverRepository {
  createDriver(driver: Driver): Promise<string>

  getDriverById(driver_id: string): Promise<Driver | null>
}