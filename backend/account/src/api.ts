import { CreateDriver } from "./application/use-cases/CreateDriver";
import CreatePassenger from './application/use-cases/CreatePassenger'
import ExpressAdapter from "./infra/http/ExpressAdapter";
import DriverController from "./infra/http/DriverController";
import PassengerController from "./infra/http/PassengerController";
import MongoConnection from "./infra/db/MongoConnectionAdapter";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";


new MongoConnection().connect();

const httpServer = new ExpressAdapter()

const repositoryFactory = new RepositoryFactoryDatabase()
const createDriver = new CreateDriver(repositoryFactory);
const createPassenger = new CreatePassenger(repositoryFactory);

new DriverController(httpServer, createDriver);
new PassengerController(httpServer, createPassenger);

httpServer.listen(3001);

