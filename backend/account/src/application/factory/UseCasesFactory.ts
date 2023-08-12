import { CreateDriver } from "../use-cases/CreateDriver";
import CreatePassenger from "../use-cases/CreatePassenger";
import RepositoryFactory from "./RepositoryFactory";

export default class UseCasesFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) { }

  getCreatePassengerUseCase() {
    return new CreatePassenger(this.repositoryFactory);
  }

  getCreateDriverUseCase() {
    return new CreateDriver(this.repositoryFactory);
  }
}