import Ride from "../src/Ride";

it("should return an instance of Ride", () => { 

  const ride = new Ride({
    lat: 10,
    long: 20
  }, {
    lat: 30,
    long: 40
  }, "passengerId");

  expect(ride).toBeInstanceOf(Ride);
})

it("should ride have a default status of waiting_driver", () => {

  const ride = new Ride({
    lat: 10,
    long: 20
  }, {
    lat: 30,
    long: 40
  }, "passengerId");

  expect(ride.status).toBe("waiting_driver");
})