import CreateTransaction from "./application/use-cases/CreateTransaction";
import GetTransaction from "./application/use-cases/GetTransaction";
import TransactionController from "./infra/controllers/TransactionController";
import MongoConnection from "./infra/db/MongoConnectionAdapter";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";
import ExpressAdapter from "./infra/http/ExpressAdapter";

new MongoConnection().connect();

const httpServer = new ExpressAdapter()

const repositoryFactory = new RepositoryFactoryDatabase()
const createTransaction = new CreateTransaction(repositoryFactory); 
const getTransaction = new GetTransaction(repositoryFactory);

new TransactionController(httpServer, createTransaction, getTransaction);

httpServer.listen(3002);

