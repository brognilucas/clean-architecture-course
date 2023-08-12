import { CreateDriver } from "./application/use-cases/CreateDriver";
import CreatePassenger from './application/use-cases/CreatePassenger'
import ExpressAdapter from "./infra/http/ExpressAdapter";
import DriverController from "./infra/http/DriverController";
import PassengerController from "./infra/http/PassengerController";
import MongoConnection from "./infra/db/MongoConnectionAdapter";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";
import GetDriver from "./application/use-cases/GetDriver";
import GetPassenger from "./application/use-cases/GetPassenger";


new MongoConnection().connect();

const httpServer = new ExpressAdapter()

const repositoryFactory = new RepositoryFactoryDatabase()

const createDriver = new CreateDriver(repositoryFactory);
const getDriver = new GetDriver(repositoryFactory)
new DriverController(httpServer, createDriver, getDriver);

const createPassenger = new CreatePassenger(repositoryFactory);
const getPassenger = new GetPassenger(repositoryFactory);
new PassengerController(httpServer, createPassenger, getPassenger);

httpServer.listen(3001);

