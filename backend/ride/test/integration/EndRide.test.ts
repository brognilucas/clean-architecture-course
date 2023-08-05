import { AcceptRide } from "../../src/application/use-cases/AcceptRide";
import CreatePassenger from "../../src/application/use-cases/CreatePassenger";
import RequestRide from "../../src/application/use-cases/RequestRide";
import StartRide from "../../src/application/use-cases/StartRide";
import { CreateDriver } from "../../src/application/use-cases/CreateDriver";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";
import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import EndRide from "../../src/application/use-cases/EndRide";
import { RideStatus } from "../../src/domain/ride/RideStatus";
import GetRide from "../../src/application/use-cases/GetRide";

let rideId: string;
let passengerId: string;
let driverId: string;

let repositoryFactory: RepositoryFactory;

beforeEach(async () => {
  repositoryFactory = new RepositoryFactoryTest();
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


  const acceptRide = new AcceptRide(repositoryFactory);

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