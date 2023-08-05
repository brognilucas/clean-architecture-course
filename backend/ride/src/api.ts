// @ts-nocheck
import { CreateDriver } from "./application/use-cases/CreateDriver";
import RequestRide from "./application/use-cases/RequestRide";
import CreatePassenger from './application/use-cases/CreatePassenger'
import { AcceptRide } from "./application/use-cases/AcceptRide";
import GetRide from './application/use-cases/GetRide'
import CalculateRide from "./application/use-cases/CalculateRide";
import StartRide from "./application/use-cases/StartRide";
import EndRide from "./application/use-cases/EndRide";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import DriverController from "./infra/http/DriverController";
import PassengerController from "./infra/http/PassengerController";
import RideController from "./infra/http/RideController";
import MongoConnection from "./infra/db/MongoConnectionAdapter";
import { PassengerRepositoryDatabase } from "./infra/repositories/PassengerRepositoryDatabase";
import DriverRepositoryDatabase from "./infra/repositories/DriverRepositoryDatabase";
import RideRepositoryDatabase from "./infra/repositories/RideRepositoryDatabase";
import AddSegmentToRide from "./application/use-cases/AddSegmentToRide";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";


new MongoConnection().connect();

const httpServer = new ExpressAdapter()

const repositoryFactory = RepositoryFactoryDatabase()

const createDriver = new CreateDriver(repositoryFactory);
const createPassenger = new CreatePassenger(repositoryFactory);
const requestRide = new RequestRide(repositoryFactory);
const getRide = new GetRide(repositoryFactory);
const acceptRide = new AcceptRide(repositoryFactory);
const calculateRide = new CalculateRide();
const startRide = new StartRide(repositoryFactory);
const endRide = new EndRide(repositoryFactory);
const addSegmentToRide = new AddSegmentToRide(repositoryFactory);

new DriverController(httpServer, createDriver);
new PassengerController(httpServer, createPassenger);
new RideController(httpServer, calculateRide, requestRide, getRide, acceptRide, startRide, endRide, addSegmentToRide);

httpServer.listen(3000);

