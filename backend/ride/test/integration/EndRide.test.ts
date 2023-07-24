//@ts-nocheck
import Ride from "../../src/domain/ride/Ride"
import { RideStatus } from "../../src/domain/ride/RideStatus"
import EndRide from "../../src/application/use-cases/EndRide"
const mockRideRepository = {
  updateRide: jest.fn(),
  getRideById: jest.fn().mockReturnValue(Ride.create(
    { lat: 0, long: 0 },
    { lat: 0, long: 0 },
    "passengerId",
    "driverId",
    RideStatus.STARTED,
    new Date(),
    new Date()
  ))
}

test("should be able to end a ride", async () => {
  const endRide = new EndRide(mockRideRepository)
  const ride = await endRide.execute("rideId")
  expect(ride.status).toBe(RideStatus.COMPLETED)
  expect(ride.completedAt).not.toBeNull()
})