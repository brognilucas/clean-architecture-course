import Coord from "../../src/domain/distance/Coord";
import Ride from "../../src/domain/ride/Ride";
import { RideStatus } from "../../src/domain/ride/RideStatus";

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

it("should ride have a default status of REQUESTED", () => {

  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 30,
    long: 40
  }, "passengerId");

  expect(ride.status).toBe(RideStatus.REQUESTED);
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
  const waitingTime = ride.calculateWaitingTime()
  expect(waitingTime).toBe(1000 * 60 * 2);
})

test("Should calculate the price of a ride during the day", () => {
  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId')
  const from = new Coord(
    -27.584905257808835,
    -48.545022195325124
  )
  const to = new Coord(-27.496887588317275, -48.522234807851476)

  ride.addSegment(from, to, new Date("2021-03-01T10:00:00"));
  expect(ride.calculatePrice()).toBe(21);
});

test("Should calculate the price of a ride during the night", () => {
  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId')
  const from = new Coord(
    -27.584905257808835,
    -48.545022195325124
  )
  const to = new Coord(-27.496887588317275, -48.522234807851476)

  ride.addSegment(from, to, new Date("2021-03-01T23:00:00"));
  expect(ride.calculatePrice()).toBe(39);
});

test("Should calculate the price of a ride during a sunday during the day", () => {
  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId')
  const from = new Coord(
    -27.584905257808835,
    -48.545022195325124
  )
  const to = new Coord(-27.496887588317275, -48.522234807851476)

  ride.addSegment(from, to, new Date("2021-03-07T10:00:00"));
  expect(ride.calculatePrice()).toBe(29);
});

test("Should calculate the price of a ride during the sunday night", () => {
  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId')

  const from = new Coord(
    -27.584905257808835,
    -48.545022195325124
  )
  const to = new Coord(-27.496887588317275, -48.522234807851476)

  ride.addSegment(from, to, new Date("2021-03-07T23:00:00"));
  expect(ride.calculatePrice()).toBe(50);
});

test("Should throw if its an invalid date", () => {
  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId')
  const from = new Coord(
    -27.584905257808835,
    -48.545022195325124
  )
  const to = new Coord(-27.496887588317275, -48.522234807851476)

  expect(() => ride.addSegment(from, to, new Date("javascript"))).toThrow(new Error("Invalid date"));
});

test("should return the min price of a ride", () => {
  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId')

  const from = new Coord(
    -27.584905257808835,
    -48.545022195325124
  )
  const to = new Coord(-27.584905257808835,
    -48.545022195325124)


  ride.addSegment(from, to, new Date("2021-03-01T10:00:00"));
  expect(ride.calculatePrice()).toBe(10);
});

test("should calculate the price of a ride with multiple segments", () => {
  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId')

  const from = new Coord(
    -27.584905257808835,
    -48.545022195325124
  )
  const to = new Coord(-27.496887588317275, -48.522234807851476)

  ride.addSegment(from, to, new Date("2021-03-01T10:00:00"));
  ride.addSegment(from, to, new Date("2021-03-01T10:00:00"));
  expect(ride.calculatePrice()).toBe(42);
});

test("should update the status of a ride when starting it", () => {
  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId', 'driverId', RideStatus.ACCEPTED);

  ride.start()
  expect(ride.status).toBe(RideStatus.STARTED);
})

test("should throw if trying to start a ride that is not accepted", () => {
  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId', 'driverId', RideStatus.REQUESTED);

  expect(() => ride.start()).toThrow(new Error("Ride is not accepted"));
})

test("should be able to accept a ride", () => {
  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId');

  ride.accept('driverId');
  expect(ride.status).toBe(RideStatus.ACCEPTED);
  expect(ride.driverId).toBe('driverId');
})

test("should not be able to accept a ride that is not waiting for a driver", () => {
  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId', 'driverId', RideStatus.ACCEPTED);

  expect(() => ride.accept('driverId')).toThrow(new Error("Ride is not waiting for a driver"));
})

test("should end a ride", () => {
  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId', 'driverId', RideStatus.STARTED);

  ride.end();

  expect(ride.status).toBe(RideStatus.COMPLETED);
  expect(ride.completedAt).toBeDefined();
})

test("should not end a ride that is not started", () => {
  const ride = Ride.create({
    lat: 10,
    long: 20
  }, {
    lat: 10,
    long: 20
  }, 'passengerId', 'driverId', RideStatus.ACCEPTED);

  expect(() => ride.end()).toThrow(new Error("Ride is not started"));
})
