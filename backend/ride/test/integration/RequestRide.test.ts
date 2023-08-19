import RequestRide from "../../src/application/use-cases/RequestRide";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";
import GetRide from "../../src/application/use-cases/GetRide";
import { RideStatus } from "../../src/domain/ride/RideStatus";
import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import AccountGateway from "../../src/infra/gateway/AccountGateway";
import AccountGatewayTest from "./gateway/AccountGatewayTest";
import Registry from "../../src/application/registry/Registry";
import { RegistryTypes } from "../../src/application/registry/RegistryTypes";
import QueueTest from "./Queue/QueueTest";
import { MessageTypes } from "../../src/application/types/MessageTypes";

Registry.register(RegistryTypes.RABBITMQ, new QueueTest());

let passengerId: string;
let repositoryFactory: RepositoryFactory;
let accountGateway: AccountGateway;
let queue: QueueTest;
beforeEach(async () => {
  accountGateway = new AccountGatewayTest();
  repositoryFactory = new RepositoryFactoryTest();

  passengerId = "random-passenger-id";

  queue = Registry.get(RegistryTypes.RABBITMQ);
})


test("should be able to request a ride", async () => {
  const requestRide = new RequestRide(repositoryFactory, accountGateway, queue);
  const output = await requestRide.execute({
    from: {
      lat: -24.3,
      long: -24.313
    },
    to: {
      lat: -24.31,
      long: -24.311
    },
    passengerId
  });

  expect(output.rideId).toBeDefined()

  const getRide = new GetRide(repositoryFactory);

  const ride = await getRide.execute(output.rideId);
  expect(ride.passengerId).toEqual(passengerId);
  expect(ride.status).toEqual(RideStatus.REQUESTED);

  await queue.consume(MessageTypes.RIDE_REQUESTED, async (message: any) => {
    expect(message.rideId).toEqual(output.rideId)
    expect(message.passengerId).toEqual(ride.passengerId);
    expect(message.requestedAt).toEqual(ride.requestedAt);
  })
})

test('should throw if passenger id is invalid', async () => {
  const requestRide = new RequestRide(repositoryFactory, accountGateway, queue);
  await expect(requestRide.execute({
    from: { lat: 10, long: 10 }, to: { lat: 10, long: 10 }, passengerId: "invalid"
  })).rejects.toThrow('Invalid passenger id');
})