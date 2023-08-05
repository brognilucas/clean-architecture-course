import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import CreatePassenger from "../../src/application/use-cases/CreatePassenger";
import { VALID_MOCK_DOCUMENT } from "../unit/Document.test";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";


let repositoryFactory: RepositoryFactory; 

beforeEach(() => { 
  repositoryFactory = new RepositoryFactoryTest(); 
})

const passengerMock = {
  name: "John Doe",
  document: VALID_MOCK_DOCUMENT,
  email: "john.doe@gmail.com"
}

test("should create an instance of CreatePassenger", () => {
  const createPassenger = new CreatePassenger(repositoryFactory);
  expect(createPassenger instanceof CreatePassenger).toBe(true)
  expect(createPassenger.execute).toBeDefined();
})

test("Should call repository.createPassenger with correct params", async () => {
  const createPassenger = new CreatePassenger(repositoryFactory);
  const output = await createPassenger.execute(passengerMock); 
  const passenger = await repositoryFactory.createPassengerRepository().getPassengerById(output.passengerId);
  expect(passenger.id).toEqual(output.passengerId)
  expect(passenger.name).toEqual(passengerMock.name)
  expect(passenger.document).toEqual(passengerMock.document)
  expect(passenger.email).toEqual(passengerMock.email)
})