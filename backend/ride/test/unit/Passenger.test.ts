import Passenger from "../../src/domain/Passenger"
import { VALID_MOCK_DOCUMENT } from "./Document.test"

const passengerMock = {
  name: "John Doe",
  document: VALID_MOCK_DOCUMENT,
  email: "john.doe@gmail.com"
}
test("should return an instance of Passenger", () => {
  const passenger = Passenger.create(passengerMock.document, passengerMock.name, passengerMock.email)
  expect(passenger).toBeInstanceOf(Passenger)
})

test("should throw when document is invalid", () => {
  expect(() => {
    Passenger.create("12345678900", passengerMock.name, passengerMock.email)
  }).toThrow("Invalid document")
})