import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import CreateTransaction from "../../src/application/use-cases/CreateTransaction";
import RepositoryFactoryDatabase from "../../src/infra/factory/RepositoryFactoryDatabase";
import { QueueTopics } from "../../src/infra/topics/QueueTopics";
import QueueTest from "./QueueTest";
import RepositoryFactoryTest from "./factory/RepositoryFactoryTest";


let createTransaction: CreateTransaction; 

let repositoryFactory: RepositoryFactory; 
let queue = new QueueTest();
beforeAll(() => {
  repositoryFactory = new RepositoryFactoryTest();
  createTransaction = new CreateTransaction(repositoryFactory, queue);
})

test("should be able to create a Transaction" , async () => { 
  const input = {
    rideId: "rideId", 
    date: new Date(), 
    amount: 50, 
  }
  const output = await createTransaction.execute(input);
  expect(output.transactionId).toBeDefined();

  await queue.consume(QueueTopics.TRANSACTION_CREATED, async (message) => {
    expect(message.transactionId).toEqual(output.transactionId);
    expect(message.amount).toEqual(input.amount);
  })
})
