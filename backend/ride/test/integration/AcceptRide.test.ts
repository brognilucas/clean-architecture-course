//@ts-nocheck
import { AcceptRide } from "../../src/application/use-cases/AcceptRide"
import Ride from '../../src/domain/ride/Ride';
import { RideStatus } from '../../src/domain/ride/RideStatus'
const mockRideRepository = {
  updateRide: jest.fn().mockReturnValue({
    status: 'accepted',
    id: '64ac3a6daac93d39a6913384',
    driverId: '64ac3a6daac93d39a6913384'
  }),

  getRideById: jest.fn().mockReturnValue(new Ride(
    '64ac3a6daac93d39a6913384',
    { lat: 123, long: 123 },
    { lat: 123, long: 123 },
    "123",
    "123",
    RideStatus.REQUESTED,
    new Date(),
  ))
}

const mockDriverRepository = {
  getDriverById: jest.fn().mockReturnValue({
    id: '64ac3a6daac93d39a6913384'
  })
}

it('should accept a ride', async () => {
  const acceptRide = new AcceptRide(mockRideRepository, mockDriverRepository);
  const output = await acceptRide.execute({
    driverId: "64ac3a6daac93d39a6913384",
    rideId: "64ac3a6daac93d39a6913384"
  });

  expect(output).toEqual({
    rideId: '64ac3a6daac93d39a6913384',
    driverId: '64ac3a6daac93d39a6913384',
    status: 'accepted'
  })
})