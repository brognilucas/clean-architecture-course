import CreatePassenger from "../../application/use-cases/CreatePassenger";
import GetPassenger from "../../application/use-cases/GetPassenger";
import HttpServer from "./HttpServer";

export default class PassengerController { 
  constructor(
    httpServer: HttpServer,
    createPassenger: CreatePassenger,
    getPassenger: GetPassenger
  ){     
    httpServer.on("post", "/passengers", async (_: any, body: any) => {
      const output = await createPassenger.execute(body);
      return output;
    })

    httpServer.on("get", "/passengers/:passengerId", async (params: any) => {
      const output = await getPassenger.execute(params);
      return output;
    })
  }
}