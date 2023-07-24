//@ts-nocheck
import StartRide from "../../src/application/use-cases/StartRide";
import Ride from '../../src/domain/ride/Ride';
import { RideStatus } from "../../src/domain/ride/RideStatus";
const rideMockRepository = {
  getRideById: jest.fn().mockImplementation((rideId) => {
    if (rideId === 'invalidId') throw new Error('Invalid ride id');
    if (rideId === 'alreadyStarted') return new Ride(
      rideId,
      { lat: 123, long: 123 },
      { lat: 123, long: 123 },
      "123",
      "123",
      RideStatus.STARTED,
      new Date(),
      new Date(),
      new Date(),
    );

    return new Ride(
      rideId,
      { lat: 123, long: 123 },
      { lat: 123, long: 123 },
      "123",
      "123",
      RideStatus.ACCEPTED,
      new Date(),
      new Date(),
    )
  }),
  updateRide: jest.fn()
}

it("should be able to start a Ride", async () => {
  const input = {
    rideId: "64ac3a6daac93d39a6913384",
    from: {
      lat: 123,
      long: 123
    }
  };
  const startRide = new StartRide(rideMockRepository);
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
  const startRide = new StartRide(rideMockRepository);
  await expect(startRide.execute(input)).rejects.toThrow('Invalid ride id');
})