import Ride from "../../src/application/domain/Ride";
import { RideStatus } from "../../src/application/domain/RideStatus";

it("should return an instance of Ride", () => {

  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 30,
    long: 40
  }, "passengerId");

  expect(ride).toBeInstanceOf(Ride);
})

it("should ride have a default status of waiting_driver", () => {

  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 30,
    long: 40
  }, "passengerId");

  expect(ride.status).toBe("waiting_driver");
})

test("should calculate the waiting time, if passing acceptedAt and requestedAt", () => {
  const acceptedAt = new Date();
  const requestedAt = new Date(acceptedAt.getTime() - 1000 * 60 * 2);

  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 30,
    long: 40
  }, "passengerId", "driverId", RideStatus.ACCEPTED, requestedAt, acceptedAt);

  expect(ride.waitingTime).toBe(1000 * 60 * 2);
})