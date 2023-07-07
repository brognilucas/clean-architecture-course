//@ts-nocheck
import { Passenger } from "../src/Passenger"
import { VALID_MOCK_DOCUMENT } from "./Document.test"

const passengerMock = {
  name: "John Doe",
  document: VALID_MOCK_DOCUMENT,
  email: "john.doe@gmail.com"
}
test("should return an instance of Passenger", () => {
  const passenger = new Passenger(passengerMock.document, passengerMock.name, passengerMock.email)
  expect(passenger).toBeInstanceOf(Passenger)
})

test("should throw when document is invalid", () => {
  expect(() => {
    new Passenger("12345678900", passengerMock.name, passengerMock.email)
  }).toThrow("Invalid document")
})