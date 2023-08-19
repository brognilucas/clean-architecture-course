import { AcceptRide } from "../../src/application/use-cases/AcceptRide";
import RequestRide from "../../src/application/use-cases/RequestRide";
import StartRide from "../../src/application/use-cases/StartRide";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";
import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import GetRide from "../../src/application/use-cases/GetRide";
import AddSegmentToRide from "../../src/application/use-cases/AddSegmentToRide";
import Segment from "../../src/domain/ride/Segment";
import Coord from "../../src/domain/distance/Coord";
import AccountGateway from "../../src/infra/gateway/AccountGateway";
import AccountGatewayTest from "./gateway/AccountGatewayTest";
import Registry from "../../src/application/registry/Registry";
import { RegistryTypes } from "../../src/application/registry/RegistryTypes";
import QueueTest from "./Queue/QueueTest";

Registry.register(RegistryTypes.RABBITMQ, new QueueTest());

let rideId: string;
let passengerId: string;
let driverId: string;

let repositoryFactory: RepositoryFactory;
let accountGateway: AccountGateway;
let queue: QueueTest;

beforeEach(async () => {
  repositoryFactory = new RepositoryFactoryTest();
  accountGateway = new AccountGatewayTest();
  passengerId = "random-passenger-id";
  queue = Registry.get(RegistryTypes.RABBITMQ);
  
  const requestRide = new RequestRide(repositoryFactory, accountGateway, queue);
  const ride = await requestRide.execute({
    from: {
      lat: -23.21343,
      long: -23.124324234
    },
    to: {
      lat: -23.23454355,
      long: -23.342234234
    },
    passengerId,
  });
  
  rideId = ride.rideId;
  driverId = "random-driver-id";
  const acceptRide = new AcceptRide(repositoryFactory, accountGateway);
  await acceptRide.execute({
    driverId,
    rideId,
  })
  const startRideInput = {
    rideId,
    from: {
      lat: 123,
      long: 123
    }
  };
  
  const startRide = new StartRide(repositoryFactory, queue);
  await startRide.execute(startRideInput)
})

test("should be able to add a segment into an existing ride", async () => {
  const addSegmentToRide = new AddSegmentToRide(repositoryFactory);
  const input = {
    rideId,
    from: {
      lat: 10,
      long: 20,
    },
    to: {
      lat: 10,
      long: 20,
    },
    date: new Date(),
  }

  await addSegmentToRide.execute(input);

  const getRide = new GetRide(repositoryFactory);
  const ride = await getRide.execute(rideId);

  expect(ride.id).toEqual(rideId);
  expect(ride.segments).toEqual([new Segment(
    new Coord(input.from.lat, input.from.long), new Coord(input.to.lat, input.to.long), input.date
  )])
})