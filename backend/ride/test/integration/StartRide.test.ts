import { AcceptRide } from "../../src/application/use-cases/AcceptRide";
import RequestRide from "../../src/application/use-cases/RequestRide";
import StartRide from "../../src/application/use-cases/StartRide";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";
import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import AccountGateway from "../../src/infra/gateway/AccountGateway";
import AccountGatewayTest from "./gateway/AccountGatewayTest";
import Registry from "../../src/application/registry/Registry";
import QueueTest from "./Queue/QueueTest";
import { RegistryTypes } from "../../src/application/registry/RegistryTypes";

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
  queue = Registry.get(RegistryTypes.RABBITMQ);
  passengerId = "random-passenger-id";

  const requestRide = new RequestRide(repositoryFactory, accountGateway);

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
})


it("should be able to start a Ride", async () => {
  const acceptRide = new AcceptRide(repositoryFactory, accountGateway);

  await acceptRide.execute({
    driverId,
    rideId,
  })

  const input = {
    rideId,
    from: {
      lat: 123,
      long: 123
    }
  };

  const startRide = new StartRide(repositoryFactory, queue);
  const output = await startRide.execute(input)
  expect(output.status).toBe("started");
  expect(output.startedAt).toBeDefined();
  expect(output.rideId).toBe(input.rideId);

  queue.consume('ride_started', async (message: any) => {
    expect(message.rideId).toBe(input.rideId);
    expect(message.startedAt).toBeDefined();
    expect(message.status).toBe("started");
  })
})

it('should throw if ride id is invalid', async () => {
  const input = {
    rideId: "invalidId",
    from: {
      lat: 123,
      long: 123
    }
  };
  const startRide = new StartRide(repositoryFactory, queue);
  await expect(startRide.execute(input)).rejects.toThrow('Invalid ride id');
})