import { CreateDriver } from "./application/use-cases/CreateDriver";
import CreatePassenger from './application/use-cases/CreatePassenger'
import ExpressAdapter from "./infra/http/ExpressAdapter";
import DriverController from "./infra/http/DriverController";
import PassengerController from "./infra/http/PassengerController";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";
import GetDriver from "./application/use-cases/GetDriver";
import GetPassenger from "./application/use-cases/GetPassenger";
import PostgresConnection from "./infra/db/PostgresConnection";

const httpServer = new ExpressAdapter()

const connection = new PostgresConnection();
const repositoryFactory = new RepositoryFactoryDatabase(connection)

const createDriver = new CreateDriver(repositoryFactory);
const getDriver = new GetDriver(repositoryFactory)
new DriverController(httpServer, createDriver, getDriver);

const createPassenger = new CreatePassenger(repositoryFactory);
const getPassenger = new GetPassenger(repositoryFactory);
new PassengerController(httpServer, createPassenger, getPassenger);

httpServer.listen(3001);

