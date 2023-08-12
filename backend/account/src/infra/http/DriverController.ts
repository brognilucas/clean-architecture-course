import { CreateDriver } from "../../application/use-cases/CreateDriver";
import GetDriver from "../../application/use-cases/GetDriver";
import HttpServer from "./HttpServer";

export default class DriverController { 
  constructor(
    httpServer: HttpServer,
    createDriver: CreateDriver,
    getDriver: GetDriver
  ){
    
    httpServer.on("post", "/drivers", async (_: any, body: any) => {
      const output = await createDriver.execute(body);
      return output;
    })

    httpServer.on("get", "/drivers/:driverId", async (params: any) => {
      const output = await getDriver.execute(params);
      return output;
    })
  }
}