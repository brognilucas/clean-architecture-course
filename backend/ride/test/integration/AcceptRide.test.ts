//@ts-nocheck
import { AcceptRide } from "../../src/application/use-cases/AcceptRide"
import { CreateDriver } from "../../src/application/use-cases/CreateDriver";
import CreatePassenger from "../../src/application/use-cases/CreatePassenger";
import RequestRide from "../../src/application/use-cases/RequestRide";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";

let rideId: string;
let passengerId: string;
let driverId: string;

let repositoryFactory: RepositoryFactory = new RepositoryFactoryTest();

beforeEach(async () => {

  const createPassenger = new CreatePassenger(repositoryFactory)
  const passenger = await createPassenger.execute({
    name: 'John Doe',
    email: 'john@doe.com',
    document: '68897396208'
  });

  passengerId = passenger.passengerId;

  const requestRide = new RequestRide(repositoryFactory);

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

  const createDriver = new CreateDriver(repositoryFactory);

  const driver = await createDriver.execute({
    name: 'John Doe',
    email: 'john@doe.com',
    document: '68897396208',
    carPlate: 'AAA9999'
  })
  driverId = driver.driverId;
})

it('should accept a ride', async () => {
  const acceptRide = new AcceptRide(repositoryFactory);
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