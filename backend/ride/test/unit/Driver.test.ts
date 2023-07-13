import Driver from "../../src/application/domain/Driver";
import { VALID_MOCK_DOCUMENT } from "./Document.test";

const driverMock = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  document: VALID_MOCK_DOCUMENT,
  carPlate: "ABC1234"
}

test("Should return an instance of driver", () => {
  const driver = Driver.create(
    driverMock.document,
    driverMock.name,
    driverMock.email,
    driverMock.carPlate
  );
  expect(driver instanceof Driver).toBe(true)
})

test("should throw when document is invalid", () => {
  expect(() => {
    Driver.create(
      "12345678900",
      driverMock.name,
      driverMock.email,
      driverMock.carPlate
    );
  }).toThrow("Invalid document")
})