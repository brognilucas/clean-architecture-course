import DriverRepository from "../../application/repository/DriverRepository";
import Driver from "../../domain/driver/Driver";
import DatabaseConnection from "../db/DatabaseConnect";

export default class DriverRepositoryPostgres implements DriverRepository { 
  constructor(private connection: DatabaseConnection){}
  
  async createDriver(driver: Driver): Promise<void> {
    await this.connection.query('INSERT INTO drivers (id, document, name, email, carPlate) VALUES (${id}, ${document}, ${name}, ${email}, ${carPlate})', driver);
  }

  async getDriverById(driverId: string): Promise<Driver> {
    const [driverData] = await this.connection.query("SELECT * FROM drivers where id = $1", [driverId])
    if (!driverData){
      throw new Error("Invalid driver id");
    }
    return new Driver(driverData.id, driverData.document, driverData.name, driverData.email, driverData.carPlate);
  }
  
}