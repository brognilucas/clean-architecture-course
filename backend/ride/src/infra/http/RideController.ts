import { AcceptRide } from "../../application/use-cases/AcceptRide";
import AddSegmentToRide from "../../application/use-cases/AddSegmentToRide";
import CalculateRide from "../../application/use-cases/CalculateRide";
import EndRide from "../../application/use-cases/EndRide";
import GetRide from "../../application/use-cases/GetRide";
import RequestRide from "../../application/use-cases/RequestRide";
import StartRide from "../../application/use-cases/StartRide";
import HttpServer from "./HttpServer";

export default class RideController { 
  constructor(
    httpServer: HttpServer,
    calculateRide: CalculateRide,
    requestRide: RequestRide,
    getRide: GetRide,
    acceptRide: AcceptRide,
    startRide: StartRide,
    endRide: EndRide,
    addSegmentToRide: AddSegmentToRide,
  ) {

    httpServer.on("post", "/calculate_ride", async (_: any, body: any) => {
      const output = await calculateRide.execute(body);
      return output;
    })

    httpServer.on("post", "/request_ride", async (_: any, body: any) => {
      const output = await requestRide.execute(body);
      return output;
    })

    httpServer.on("get", "/rides/:id", async (params: any) => {
      const output = await getRide.execute(params.id);
      return output;
    })

    httpServer.on("post", "/accept_ride/:rideId", async (params: any, body: any) => {
      const output = await acceptRide.execute({rideId: params.rideId, driverId: body.driverId});
      return output;
    })

    httpServer.on("post", "/start_ride", async (_: any, body: any) => {
      const output = await startRide.execute({
        rideId: body.rideId,
        from: body.from,
      });
      return output;
    })

    httpServer.on("post", "/end_ride", async (_: any, body: any) => {
      const output = await endRide.execute(body);
      return output;
    })

    httpServer.on("post", "/add_segment", async (_: any, body: any) => {
      const output = await addSegmentToRide.execute(body);
      return output;
    })
  }
  
}