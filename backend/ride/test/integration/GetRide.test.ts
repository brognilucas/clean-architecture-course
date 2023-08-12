import RequestRide from "../../src/application/use-cases/RequestRide";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";
import GetRide from "../../src/application/use-cases/GetRide";
import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import AccountGateway from "../../src/infra/gateway/AccountGateway";
import AccountGatewayTest from "./gateway/AccountGatewayTest";

let passengerId: string;
let repositoryFactory: RepositoryFactory;
let accountGateway: AccountGateway;
beforeEach(async () => {
  repositoryFactory = new RepositoryFactoryTest();
  accountGateway = new AccountGatewayTest(); 
  passengerId = "random-passenger-id";
})

test("should be able to retrieve a ride", async () => {
  const requestRide = new RequestRide(repositoryFactory, accountGateway); 
  const rideInput = {
    from: {
      lat: 10, 
      long: 10,   
    },
    to: {
      lat: 10,
      long: 10
    },
    passengerId
  }
  const createRideOutput = await requestRide.execute(rideInput)
  const getRide = new GetRide(repositoryFactory);
  const ride = await getRide.execute(createRideOutput.rideId);
  expect(ride).toBeDefined();
  expect(ride.id).toEqual(createRideOutput.rideId)
  expect(ride.passengerId).toEqual(passengerId);
  expect(ride.from.lat).toEqual(rideInput.from.lat)
  expect(ride.from.long).toEqual(rideInput.from.long)
  expect(ride.to.lat).toEqual(rideInput.to.lat)
  expect(ride.to.long).toEqual(rideInput.to.long)
})