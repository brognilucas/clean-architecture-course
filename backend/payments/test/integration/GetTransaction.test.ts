import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import CreateTransaction from "../../src/application/use-cases/CreateTransaction";
import GetTransaction from "../../src/application/use-cases/GetTransaction";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";


let createTransaction: CreateTransaction; 
let getTransaction: GetTransaction;
let repositoryFactory: RepositoryFactory; 

beforeAll(() => {
  repositoryFactory = new RepositoryFactoryTest();
  createTransaction = new CreateTransaction(repositoryFactory);
  getTransaction = new GetTransaction(repositoryFactory);
})

test("should be able to create a Transaction" , async () => { 
  const input = {
    rideId: "rideId", 
    date: new Date(), 
    amount: 50, 
  }
  const outputCreateTransaction = await createTransaction.execute(input);

  const transaction = await getTransaction.execute({ transactionId: outputCreateTransaction.transactionId });

  expect(transaction.transactionId).toEqual(outputCreateTransaction.transactionId)
  expect(transaction.rideId).toEqual(input.rideId)
  expect(transaction.amount).toEqual(input.amount)
  expect(transaction.date).toEqual(input.date)
})

test("should throw if transaction does not exists" , async () => { 
  expect(() => getTransaction.execute({ transactionId: 'random-id' })).rejects.toThrow("Transaction not found");
})
