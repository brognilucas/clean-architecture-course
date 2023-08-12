import { CreateDriver } from "../../application/use-cases/CreateDriver";
import HttpServer from "./HttpServer";

export default class DriverController { 
  constructor(
    httpServer: HttpServer,
    createDriver: CreateDriver,
  ){
    
    httpServer.on("post", "/drivers", async (_: any, body: any) => {
      const output = await createDriver.execute(body);
      return output;
    })
  }
}