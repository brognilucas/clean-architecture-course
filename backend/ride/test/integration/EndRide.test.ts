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

let rideId: string;
let passengerId: string;
let driverId: string;

let repositoryFactory: RepositoryFactory;
let accountGateway: AccountGateway;
beforeEach(async () => {
  accountGateway = new AccountGatewayTest();
  repositoryFactory = new RepositoryFactoryTest();
  
  passengerId = "random-passenger-id";
  driverId = "random-driver-id";
  
  const requestRide = new RequestRide(repositoryFactory, accountGateway);
  const acceptRide = new AcceptRide(repositoryFactory, accountGateway);

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

  const startRide = new StartRide(repositoryFactory);
  await startRide.execute(startRideInput)
})


test("should be able to end a ride", async () => {
  const endRide = new EndRide(repositoryFactory)
  await endRide.execute({ rideId })
  const getRide = new GetRide(repositoryFactory);
  const ride = await getRide.execute(rideId);
  expect(ride.status).toEqual(RideStatus.COMPLETED);
  expect(ride.completedAt).toBeDefined();
})