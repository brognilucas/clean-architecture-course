import Ride from "../../src/domain/Ride";
import { RideStatus } from "../../src/domain/RideStatus";

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

test("Should calculate the price of a ride during the day", function () {
	const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId')
	ride.addSegment(10, new Date("2021-03-01T10:00:00"));
	expect(ride.calculatePrice()).toBe(21);
});

test("Should calculate the price of a ride during the night", function () {
	const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId')
	ride.addSegment(10, new Date("2021-03-01T23:00:00"));
	expect(ride.calculatePrice()).toBe(39);
});

test("Should calculate the price of a ride during a sunday during the day", function () {
	const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId')
	ride.addSegment(10, new Date("2021-03-07T10:00:00"));
	expect(ride.calculatePrice()).toBe(29);
});

test("Should calculate the price of a ride during the sunday night", function () {
	const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId')
	ride.addSegment(10, new Date("2021-03-07T23:00:00"));
	expect(ride.calculatePrice()).toBe(50);
});

test("Should throw if is an invalid distance", function () {
	const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId')
	expect(() => ride.addSegment(-10, new Date("2023-03-01T10:00:00"))).toThrow(new Error("Invalid distance"));
});

test("Should throw if its an invalid date", function () {
	const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId')
	expect(() => ride.addSegment(10, new Date("javascript"))).toThrow(new Error("Invalid date"));
});

test("should return the min price of a ride", function () {
	const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId')
	ride.addSegment(3, new Date("2021-03-01T10:00:00"));
	expect(ride.calculatePrice()).toBe(10);
});

test("should calculate the price of a ride with multiple segments", function () {
	const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId')
	ride.addSegment(10, new Date("2021-03-01T10:00:00"));
	ride.addSegment(10, new Date("2021-03-01T10:00:00"));
	expect(ride.calculatePrice()).toBe(42);
});
