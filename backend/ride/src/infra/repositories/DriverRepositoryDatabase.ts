import Driver from '../../domain/Driver';
import DriverRepository from '../../application/repository/DriverRepository';
import { DriverModel } from '../schemas/DriverSchema'

export default class DriverRepositoryDatabase implements DriverRepository {

  async createDriver(driver: Driver): Promise<void> {
    await DriverModel.create(driver);
  }

  async getDriverById(driverId: string): Promise<Driver> {
    const driver = await DriverModel.findOne({ id: driverId });
    if (!driver) {
      throw new Error("Invalid driver id");
    }
    return new Driver(
      driver.id,
      driver.document,
      driver.name,
      driver.email,
      driver.carPlate,
    );
  }
}
