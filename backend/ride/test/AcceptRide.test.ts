//@ts-nocheck
import { AcceptRide } from "../src/use-cases/AcceptRide"

const mockRideRepository = {
  acceptRide: jest.fn().mockReturnValue({
    status: 'accepted',
    id: '64ac3a6daac93d39a6913384',
    driver_id: '64ac3a6daac93d39a6913384'
  }),

  getRideById: jest.fn().mockReturnValue({
    status: 'waiting_driver',
    ride_id: '64ac3a6daac93d39a6913384',
    driver_id: '64ac3a6daac93d39a6913384'
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
    driver_id: "64ac3a6daac93d39a6913384",
    ride_id: "64ac3a6daac93d39a6913384"
  });

  expect(output).toEqual({
    ride_id: '64ac3a6daac93d39a6913384',
    driver_id: '64ac3a6daac93d39a6913384',
    status: 'accepted'
  })
})