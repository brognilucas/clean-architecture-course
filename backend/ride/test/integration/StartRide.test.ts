import { AcceptRide } from "../../src/application/use-cases/AcceptRide";
import CreatePassenger from "../../src/application/use-cases/CreatePassenger";
import RequestRide from "../../src/application/use-cases/RequestRide";
import StartRide from "../../src/application/use-cases/StartRide";
import { CreateDriver  } from "../../src/application/use-cases/CreateDriver";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";
import RepositoryFactory from "../../src/application/factory/RepositoryFactory";

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
})


it("should be able to start a Ride", async () => {

  const acceptRide = new AcceptRide(repositoryFactory);

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