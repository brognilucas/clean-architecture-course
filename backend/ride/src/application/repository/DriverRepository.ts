import Driver  from "../../domain/Driver"

export default interface DriverRepository {
  createDriver(driver: Driver): Promise<void>

  getDriverById(driver_id: string): Promise<Driver>
}