import DriverRepository from "../../../src/application/repository/DriverRepository";
import Driver from "../../../src/domain/driver/Driver";

export default class DriverRepositoryTest implements DriverRepository {
  private drivers = new Map();
  
  async createDriver(driver: Driver): Promise<void> {
    this.drivers.set(driver.id, driver);
  }
  
  async getDriverById(driver_id: string): Promise<Driver> {
    return this.drivers.get(driver_id);
  } 

}