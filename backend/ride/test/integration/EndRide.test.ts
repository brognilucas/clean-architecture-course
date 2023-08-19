import { AcceptRide } from "../../src/application/use-cases/AcceptRide";
import RequestRide from "../../src/application/use-cases/RequestRide";
import StartRide from "../../src/application/use-cases/StartRide";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";
import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import EndRide from "../../src/application/use-cases/EndRide";
import { RideStatus } from "../../src/domain/ride/RideStatus";
import GetRide from "../../src/application/use-cases/GetRide";
import AccountGateway from "../../src/infra/gateway/AccountGateway";
import AccountGatewayTest from "./gateway/AccountGatewayTest";
import Registry from "../../src/application/registry/Registry";
import { RegistryTypes } from "../../src/application/registry/RegistryTypes";
import QueueTest from "./Queue/QueueTest";
import Queue from "../../src/infra/queue/Queue";
import { MessageTypes } from "../../src/application/types/MessageTypes";

Registry.register(RegistryTypes.RABBITMQ, new QueueTest());

let rideId: string;
let passengerId: string;
let driverId: string;

let repositoryFactory: RepositoryFactory;
let accountGateway: AccountGateway;
let queue: Queue;
beforeEach(async () => {
  accountGateway = new AccountGatewayTest();
  repositoryFactory = new RepositoryFactoryTest();
  
  passengerId = "random-passenger-id";
  driverId = "random-driver-id";
  
  queue = Registry.get(RegistryTypes.RABBITMQ);
  
  const requestRide = new RequestRide(repositoryFactory, accountGateway, queue);
  const acceptRide = new AcceptRide(repositoryFactory, accountGateway, queue);

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


test("should be able to end a ride", async () => {
  const endRide = new EndRide(repositoryFactory, queue)
  await endRide.execute({ rideId })
  const getRide = new GetRide(repositoryFactory);
  const ride = await getRide.execute(rideId);
  expect(ride.status).toEqual(RideStatus.COMPLETED);
  expect(ride.completedAt).toBeDefined();

  await queue.consume(MessageTypes.RIDE_COMPLETED, async (message) => { 
    expect(message.rideId).toEqual(ride.id)
    expect(message.completedAt).toEqual(ride.completedAt)
    expect(message.status).toEqual(ride.status)
    expect(message.price).toBeDefined();
    expect(message.price).toBeGreaterThanOrEqual(10);
  })
})