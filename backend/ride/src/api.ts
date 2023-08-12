import { CreateDriver } from "./application/use-cases/CreateDriver";
import CreatePassenger from './application/use-cases/CreatePassenger'
import ExpressAdapter from "./infra/http/ExpressAdapter";
import DriverController from "./infra/http/DriverController";
import PassengerController from "./infra/http/PassengerController";
import RideController from "./infra/http/RideController";
import MongoConnection from "./infra/db/MongoConnectionAdapter";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";
import UseCasesFactory from "./application/factory/UseCasesFactory";


new MongoConnection().connect();

const httpServer = new ExpressAdapter()

const repositoryFactory = new RepositoryFactoryDatabase()
const useCaseFactory = new UseCasesFactory(repositoryFactory);
new RideController(httpServer, useCaseFactory);

httpServer.listen(3000);

