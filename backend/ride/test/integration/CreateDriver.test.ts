import { CreateDriver } from "../../src/application/use-cases/CreateDriver";
import { VALID_MOCK_DOCUMENT } from "../unit/Document.test";

const repositoryMock = {
  createDriver: jest.fn(),
  getDriverById: jest.fn()
}

const driverMock = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  document: VALID_MOCK_DOCUMENT,
  carPlate: "ABC1234"
}

test("should create an instance of CreateDriver", () => {
  const createDriver = new CreateDriver(repositoryMock);
  expect(createDriver instanceof CreateDriver).toBe(true)
  expect(createDriver.execute).toBeDefined();
})

test("Should call repository.createDriver with correct params", async () => {
  const createDriver = new CreateDriver(repositoryMock);
  await createDriver.execute(driverMock);
  expect(repositoryMock.createDriver).toBeCalledWith({
    name: driverMock.name,
    email: driverMock.email,
    document: driverMock.document,
    carPlate: driverMock.carPlate,
    id: expect.any(String)
  })
})