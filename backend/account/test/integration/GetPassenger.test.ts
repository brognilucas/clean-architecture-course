import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import CreatePassenger from "../../src/application/use-cases/CreatePassenger";
import GetPassenger from "../../src/application/use-cases/GetPassenger";
import { VALID_MOCK_DOCUMENT } from "../unit/Document.test";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";

let repositoryFactory: RepositoryFactory;
beforeEach(() => {
  repositoryFactory = new RepositoryFactoryTest();
});


test("should be able to get an existing Passenger ", async () => {
  const createPassenger = new CreatePassenger(repositoryFactory);

  const { passengerId } = await createPassenger.execute({
    name: 'Passenger',
    document: VALID_MOCK_DOCUMENT,
    email: "random@email.com"
  })

  const getPassenger = new GetPassenger(repositoryFactory); 

  const Passenger = await getPassenger.execute({ passengerId });

  expect(Passenger.passengerId).toEqual(passengerId);
  expect(Passenger.name).toEqual('Passenger');
  expect(Passenger.document).toEqual(VALID_MOCK_DOCUMENT);
  expect(Passenger.email).toEqual("random@email.com")
})

test("should throw an error if trying to get a Passenger that does not exists", async () => {
  const passengerId = "random-id"; 
  const getPassenger = new GetPassenger(repositoryFactory); 
  expect(getPassenger.execute({ passengerId })).rejects.toThrow('Passenger not found');
})