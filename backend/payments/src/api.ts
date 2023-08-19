import PaypalProvider from "./application/gateway/PaypalProvider";
import CreateTransaction from "./application/use-cases/CreateTransaction";
import GetTransaction from "./application/use-cases/GetTransaction";
import ProcessPayment from "./application/use-cases/ProcessPayment";
import TransactionController from "./infra/controllers/TransactionController";
import MongoConnection from "./infra/db/MongoConnectionAdapter";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import QueueControllers from "./infra/queue-controllers/QueueControllers";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";


async function main() { 
  
  new MongoConnection().connect();
  const queue = new RabbitMQAdapter();
  await queue.connect();

  const httpServer = new ExpressAdapter()
  const repositoryFactory = new RepositoryFactoryDatabase()
  const createTransaction = new CreateTransaction(repositoryFactory, queue); 
  const getTransaction = new GetTransaction(repositoryFactory);
  const paymentProvider = new PaypalProvider(); 

  const processPayment = new ProcessPayment(paymentProvider, queue); 
  
  new QueueControllers(createTransaction, processPayment, queue)
  
  new TransactionController(httpServer, createTransaction, getTransaction);

  httpServer.listen(3002);
} 

main()

