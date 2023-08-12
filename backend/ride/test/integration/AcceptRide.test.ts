import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import { AcceptRide } from "../../src/application/use-cases/AcceptRide"
import RequestRide from "../../src/application/use-cases/RequestRide";
import AccountGateway from "../../src/infra/gateway/AccountGateway";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";
import AccountGatewayTest from "./gateway/AccountGatewayTest";

let rideId: string;
let passengerId: string;
let driverId: string;

let repositoryFactory: RepositoryFactory = new RepositoryFactoryTest();
let accountGateway: AccountGateway = new AccountGatewayTest();
beforeEach(async () => {

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

it('should accept a ride', async () => {
  const acceptRide = new AcceptRide(repositoryFactory, accountGateway);
  const output = await acceptRide.execute({
    driverId,
    rideId,
  });

  expect(output).toEqual({
    rideId,
    driverId,
    status: 'accepted'
  })
})

it('should throw an error if driver does not exists' , async () => { 
  const acceptRide = new AcceptRide(repositoryFactory, accountGateway);
  expect(() => acceptRide.execute({
    driverId: "not-the-correct-driverId",
    rideId,
  })).rejects.toThrowError("Driver is invalid")
})