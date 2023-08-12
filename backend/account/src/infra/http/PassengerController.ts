import CreatePassenger from "../../application/use-cases/CreatePassenger";
import HttpServer from "./HttpServer";

export default class PassengerController { 
  constructor(
    httpServer: HttpServer,
    createPassenger: CreatePassenger,
  ){     
    httpServer.on("post", "/passengers", async (_: any, body: any) => {
      const output = await createPassenger.execute(body);
      return output;
    })
  }
}