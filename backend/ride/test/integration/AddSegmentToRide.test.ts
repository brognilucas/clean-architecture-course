import RideRepository from "../../src/application/repository/RideRepository";
import AddSegmentToRide from "../../src/application/use-cases/AddSegmentToRide";
import Ride from "../../src/domain/Ride"
import Segment from "../../src/domain/Segment";

const mockRepository = {
  getRideById: jest.fn().mockImplementation((rideId) => new Ride(
    rideId,
    { lat: 10, long: 20, },
    { lat: 10, long: 20, },
    "passengerId"
  )),
  updateRide: jest.fn(),
} as unknown as RideRepository

test("should be able to add a segment into an existing ride", async () => {
  const ride = Ride.create(
    { lat: 10, long: 20, },
    { lat: 10, long: 20, },
    "passengerId"
  );

  const useCase = new AddSegmentToRide(mockRepository);

  const input = {
    rideId: ride.id,
    from: {
      lat: 10,
      long: 20,
    },
    to: {
      lat: 10,
      long: 20,
    },
    date: new Date(),
  }

  ride.segments = [{
    from: input.from,
    to: input.to,
    date: input.date,
  } as Segment]

  await useCase.execute(input);

  expect(mockRepository.getRideById).toHaveBeenCalledWith(ride.id);
  expect(mockRepository.updateRide).toHaveBeenCalled();
})