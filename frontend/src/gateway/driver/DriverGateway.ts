import Driver from "../../entities/Driver";

export default interface DriverGateway { 
  save(driver: Driver): Promise<SaveDriverOutput>
}

type SaveDriverOutput = {
  driverId: string
}