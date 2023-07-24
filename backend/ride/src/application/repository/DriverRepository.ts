import Driver  from "../../domain/driver/Driver"

export default interface DriverRepository {
  createDriver(driver: Driver): Promise<void>

  getDriverById(driver_id: string): Promise<Driver>
}