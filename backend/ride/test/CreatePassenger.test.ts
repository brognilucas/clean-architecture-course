import CreatePassenger from "../src/use-cases/CreatePassenger";
import { VALID_MOCK_DOCUMENT } from "./Document.test";

const passengerRepositoryMock = {
  createPassenger: jest.fn()
}

const passengerMock = {
  name: "John Doe",
  document: VALID_MOCK_DOCUMENT,
  email: "john.doe@gmail.com"
}

test("should create an instance of CreatePassenger", () => {
  const createPassenger = new CreatePassenger(passengerRepositoryMock);
  expect(createPassenger instanceof CreatePassenger).toBe(true)
  expect(createPassenger.execute).toBeDefined();
})

test("Should call repository.createPassenger with correct params", async () => {
  const createPassenger = new CreatePassenger(passengerRepositoryMock);
  await createPassenger.execute(passengerMock);

  expect(passengerRepositoryMock.createPassenger).toBeCalledWith(passengerMock)
})