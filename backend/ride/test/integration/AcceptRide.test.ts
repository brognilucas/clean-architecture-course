//@ts-nocheck
import { AcceptRide } from "../../src/application/use-cases/AcceptRide"

const mockRideRepository = {
  acceptRide: jest.fn().mockReturnValue({
    status: 'accepted',
    id: '64ac3a6daac93d39a6913384',
    driverId: '64ac3a6daac93d39a6913384'
  }),

  getRideById: jest.fn().mockReturnValue({
    status: 'waiting_driver',
    rideId: '64ac3a6daac93d39a6913384',
    driverId: '64ac3a6daac93d39a6913384'
  })
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