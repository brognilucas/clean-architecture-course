import { AcceptRide } from "../../src/application/use-cases/AcceptRide";
import RequestRide from "../../src/application/use-cases/RequestRide";
import StartRide from "../../src/application/use-cases/StartRide";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";
import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import AccountGateway from "../../src/infra/gateway/AccountGateway";
import AccountGatewayTest from "./gateway/AccountGatewayTest";

let rideId: string;
let passengerId: string;
let driverId: string;

let repositoryFactory: RepositoryFactory;
let accountGateway: AccountGateway; 
beforeEach(async () => {
  repositoryFactory = new RepositoryFactoryTest();
  accountGateway = new AccountGatewayTest(); 

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

  const startRide = new StartRide(repositoryFactory);
  const output = await startRide.execute(input)
  expect(output.status).toBe("started");
  expect(output.startedAt).toBeDefined();
  expect(output.rideId).toBe(input.rideId);
})

it('should throw if ride id is invalid', async () => {
  const input = {
    rideId: "invalidId",
    from: {
      lat: 123,
      long: 123
    }
  };
  const startRide = new StartRide(repositoryFactory);
  await expect(startRide.execute(input)).rejects.toThrow('Invalid ride id');
})