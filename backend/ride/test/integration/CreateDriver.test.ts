import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import { CreateDriver } from "../../src/application/use-cases/CreateDriver";
import { VALID_MOCK_DOCUMENT } from "../unit/Document.test";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";

let repositoryFactory: RepositoryFactory;

beforeEach(() => { 
  repositoryFactory = new RepositoryFactoryTest();
})

const driverMock = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  document: VALID_MOCK_DOCUMENT,
  carPlate: "ABC1234"
}

test("should create an instance of CreateDriver", () => {
  const createDriver = new CreateDriver(repositoryFactory);
  expect(createDriver instanceof CreateDriver).toBe(true)
  expect(createDriver.execute).toBeDefined();
})

test("Should call repository.createDriver with correct params", async () => {
  const createDriver = new CreateDriver(repositoryFactory);
  const output = await createDriver.execute(driverMock);
  const driver = await repositoryFactory.createDriverRepository().getDriverById(output.driverId);
  expect(driver.id).toEqual(output.driverId)
  expect(driver.name).toEqual(driverMock.name)
  expect(driver.document).toEqual(driverMock.document)
  expect(driver.email).toEqual(driverMock.email)
  expect(driver.carPlate).toEqual(driverMock.carPlate)
})