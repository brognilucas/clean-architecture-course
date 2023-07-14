// @ts-nocheck
import GetRide from "../../src/application/use-cases/GetRide"
const rideMockRepository = {
  getRideById: jest.fn().mockReturnValue({
    from: {
      lat: 0,
      long: 0
    },
    to: {
      lat: 0,
      long: 0
    },
    passenger_id: "64ac3a6daac93d39a6913384",
    driver_id: "64ac3a6daac93d39a6913384",
    status: "accepted",
    requestedAt: new Date(),
    acceptedAt: new Date(),
    id: "64ac3a6daac93d39a6913384"
  })

}
test("should be able to retrieve a ride", async () => {
  const getRide = new GetRide(rideMockRepository);

  const ride = await getRide.execute("64ac3a6daac93d39a6913384");

  expect(ride).toBeDefined();
})