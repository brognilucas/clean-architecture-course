import AccountGateway from "../../infra/gateway/AccountGateway";
import { AcceptRide } from "../use-cases/AcceptRide";
import AddSegmentToRide from "../use-cases/AddSegmentToRide";
import CalculateRide from "../use-cases/CalculateRide";
import EndRide from "../use-cases/EndRide";
import GetRide from "../use-cases/GetRide";
import RequestRide from "../use-cases/RequestRide";
import StartRide from "../use-cases/StartRide";
import RepositoryFactory from "./RepositoryFactory";

export default class UseCasesFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory, private readonly accountGateway: AccountGateway) { }
  getRequestRide() {
    return new RequestRide(this.repositoryFactory, this.accountGateway);
  }
  
  getGetRide() {
    return new GetRide(this.repositoryFactory);
  }

  getAcceptRide() {
    return new AcceptRide(this.repositoryFactory, this.accountGateway);
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