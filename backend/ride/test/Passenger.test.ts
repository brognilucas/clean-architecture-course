//@ts-nocheck
import { Passenger } from "../src/Passenger"
import { VALID_MOCK_DOCUMENT } from "./Document.test"

const passengerRepositoryMock = {
  createPassenger: jest.fn()
}

test("should return an instance of Passenger", () => {
  const passenger = new Passenger(passengerRepositoryMock)
  expect(passenger).toBeInstanceOf(Passenger)
})

test("should create a passenger", async () => {
  const passenger = new Passenger(passengerRepositoryMock)
  const passengerMock = {
    name: "John Doe",
    document: VALID_MOCK_DOCUMENT,
    email: "john@doe.com",
  }
  await passenger.createPassenger(passengerMock)
  expect(passengerRepositoryMock.createPassenger).toHaveBeenCalledWith(passengerMock)
})

test("should throw an error if document is invalid", async () => {
  const passenger = new Passenger(passengerRepositoryMock)
  const passengerMock = {
    name: "John Doe",
    document: "12345678910",
    email: "johnDoe@email.com",
  }

  await expect(passenger.createPassenger(passengerMock)).rejects.toThrow("Invalid document")
})