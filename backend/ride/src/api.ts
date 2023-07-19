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


new MongoConnection().connect();

const httpServer = new ExpressAdapter()
const passengerRepository = new PassengerRepositoryDatabase();
const driverRepository = new DriverRepositoryDatabase();
const rideRepository = new RideRepositoryDatabase();
const createDriver = new CreateDriver(driverRepository);
const createPassenger = new CreatePassenger(passengerRepository);
const requestRide = new RequestRide(rideRepository,passengerRepository);
const getRide = new GetRide(rideRepository);
const acceptRide = new AcceptRide(rideRepository, driverRepository);
const calculateRide = new CalculateRide();
const startRide = new StartRide(rideRepository);
const endRide = new EndRide(rideRepository);

new DriverController(httpServer, createDriver);
new PassengerController(httpServer, createPassenger);
new RideController(httpServer, calculateRide, requestRide, getRide, acceptRide, startRide, endRide);

httpServer.listen(3000);

