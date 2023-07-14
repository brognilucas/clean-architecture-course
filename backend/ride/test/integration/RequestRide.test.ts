//@ts-nocheck
import Ride from "../../src/domain/Ride";
import RequestRide from "../../src/application/use-cases/RequestRide";

const rideRepositoryMock = {
  createRide: jest.fn(),
}

const passengerRepositoryMock = { 
  getPassengerById: jest.fn().mockImplementation((id) => {
    if (id === "invalid_id") return null;
    return { id }
  })
}

test("should be able to request a ride", async () => {
  const ride = Ride.create(
    { lat: 123, long: 123 },
    { lat: 123, long: 123 },
    "123"
  );

  const requestRide = new RequestRide(rideRepositoryMock, passengerRepositoryMock);
  const output = await requestRide.execute(ride);
  expect(output.rideId).toBeDefined()
})

test('should throw if passenger id is invalid', async () => {
  const ride = Ride.create(
    { lat: 123, long: 123 },
    { lat: 123, long: 123 },
    "invalid_id"
  );
  const requestRide = new RequestRide(rideRepositoryMock, passengerRepositoryMock);
  await expect(requestRide.execute(ride)).rejects.toThrow('Invalid passenger id');
})