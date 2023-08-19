import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import Registry from "../../src/application/registry/Registry";
import { RegistryTypes } from "../../src/application/registry/RegistryTypes";
import { MessageTypes } from "../../src/application/types/MessageTypes";
import { AcceptRide } from "../../src/application/use-cases/AcceptRide"
import RequestRide from "../../src/application/use-cases/RequestRide";
import AccountGateway from "../../src/infra/gateway/AccountGateway";
import Queue from "../../src/infra/queue/Queue";
import QueueTest from "./Queue/QueueTest";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";
import AccountGatewayTest from "./gateway/AccountGatewayTest";

let rideId: string;
let passengerId: string;
let driverId: string;

let repositoryFactory: RepositoryFactory = new RepositoryFactoryTest();
let accountGateway: AccountGateway = new AccountGatewayTest();
Registry.register(RegistryTypes.RABBITMQ, new QueueTest());
let queue: Queue; 
beforeEach(async () => {
  queue = Registry.get(RegistryTypes.RABBITMQ)
  passengerId = "random-passenger-id";

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
})

it('should accept a ride', async () => {
  const acceptRide = new AcceptRide(repositoryFactory, accountGateway, queue);
  const output = await acceptRide.execute({
    driverId,
    rideId,
  });

  expect(output).toEqual({
    rideId,
    driverId,
    status: 'accepted'
  })

  queue.consume(MessageTypes.RIDE_ACCEPTED, async (message: any) => { 
    expect(message.rideId).toEqual(rideId)
    expect(message.driverId).toEqual(output.driverId)
  })
})

it('should throw an error if driver does not exists' , async () => { 
  const acceptRide = new AcceptRide(repositoryFactory, accountGateway, queue);
  expect(() => acceptRide.execute({
    driverId: "not-the-correct-driverId",
    rideId,
  })).rejects.toThrowError("Driver is invalid")
})