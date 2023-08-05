import { AcceptRide } from "../use-cases/AcceptRide";
import AddSegmentToRide from "../use-cases/AddSegmentToRide";
import CalculateRide from "../use-cases/CalculateRide";
import { CreateDriver } from "../use-cases/CreateDriver";
import CreatePassenger from "../use-cases/CreatePassenger";
import EndRide from "../use-cases/EndRide";
import GetRide from "../use-cases/GetRide";
import RequestRide from "../use-cases/RequestRide";
import StartRide from "../use-cases/StartRide";
import RepositoryFactory from "./RepositoryFactory";

export default class UseCasesFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) { }

  getCreatePassengerUseCase() {
    return new CreatePassenger(this.repositoryFactory);
  }

  getCreateDriverUseCase() {
    return new CreateDriver(this.repositoryFactory);
  }

  getRequestRide() {
    return new RequestRide(this.repositoryFactory);
  }

  getGetRide() {
    return new GetRide(this.repositoryFactory);
  }

  getAcceptRide() {
    return new AcceptRide(this.repositoryFactory);
  }
  
  getStartRide() {
    return new StartRide(this.repositoryFactory)
  }
  
  getAddSegmentToRide() {
    return new AddSegmentToRide(this.repositoryFactory);
  }
  
  getEndRide() { 
    return new EndRide(this.repositoryFactory);
  }

  getCalculateRide() { 
    return new CalculateRide()
  }

}