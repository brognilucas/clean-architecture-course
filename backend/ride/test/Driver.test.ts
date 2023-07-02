import { Driver } from "../src/Driver";
import { VALID_MOCK_DOCUMENT } from "./Document.test";
const repositoryMock = {
  createDriver: jest.fn()
}

test("Should return an instance of driver", () => {
  const driver = new Driver();
  expect(driver instanceof Driver).toBe(true)
})

test("Should throw when creating a driver that is not valid", () => {
  const driver = new Driver(repositoryMock);

  expect(() => driver.createDriver({
    name: "John Doe",
    email: "john@doe.com",
    document: "12345678900",
    carPlate: "ABC1234"
  })).rejects.toThrow("Invalid document")
})


test('should return the id of the created driver', async () => {
  const driver = new Driver(repositoryMock);
  const mockedDriverId = "driverId";

  repositoryMock.createDriver.mockResolvedValue(mockedDriverId);
  const driverId = await driver.createDriver({
    name: "John Doe",
    email: "john@doe.com",
    document: VALID_MOCK_DOCUMENT,
    carPlate: "ABC1234"
  })
  expect(driverId).toBe(mockedDriverId);
})