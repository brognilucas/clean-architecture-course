import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import CreateTransaction from "../../src/application/use-cases/CreateTransaction";
import RepositoryFactoryDatabase from "../../src/infra/factory/RepositoryFactoryDatabase";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";


let createTransaction: CreateTransaction; 

let repositoryFactory: RepositoryFactory; 

beforeAll(() => {
  repositoryFactory = new RepositoryFactoryTest();
  createTransaction = new CreateTransaction(repositoryFactory);
})

test("should be able to create a Transaction" , async () => { 
  const input = {
    rideId: "rideId", 
    date: new Date(), 
    amount: 50, 
  }
  const output = await createTransaction.execute(input);
  expect(output.transactionId).toBeDefined();
})
