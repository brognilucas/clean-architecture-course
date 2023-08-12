import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import { CreateDriver } from "../../src/application/use-cases/CreateDriver";
import GetDriver from "../../src/application/use-cases/GetDriver";
import { VALID_MOCK_DOCUMENT } from "../unit/Document.test";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";

let repositoryFactory: RepositoryFactory;
beforeEach(() => {
  repositoryFactory = new RepositoryFactoryTest();
});


test("should be able to get an existing driver ", async () => {
  const createDriver = new CreateDriver(repositoryFactory);

  const { driverId } = await createDriver.execute({
    name: 'driver',
    carPlate: "AAA9999",
    document: VALID_MOCK_DOCUMENT,
    email: "random@email.com"
  })

  const getDriver = new GetDriver(repositoryFactory); 

  const driver = await getDriver.execute({ driverId });

  expect(driver.driverId).toEqual(driverId);
  expect(driver.name).toEqual('driver');
  expect(driver.carPlate).toEqual("AAA9999")
  expect(driver.document).toEqual(VALID_MOCK_DOCUMENT);
  expect(driver.email).toEqual("random@email.com")
})

test("should throw an error if trying to get a driver that does not exists", async () => {
  const driverId = "random-id"; 
  const getDriver = new GetDriver(repositoryFactory); 
  expect(getDriver.execute({ driverId })).rejects.toThrow('Driver not found');
})