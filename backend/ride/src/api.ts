import ExpressAdapter from "./infra/http/ExpressAdapter";
import RideController from "./infra/http/RideController";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";
import UseCasesFactory from "./application/factory/UseCasesFactory";
import AxiosAdapter from "./infra/adapter/AxiosAdapter";
import AccountGatewayHttp from "./application/gateway/AccountGatewayHttp";
import Queue from "./infra/adapter/RabbitMQAdapter";
import Registry from "./application/registry/Registry";
import PostgresConnection from "./infra/db/PostgresConnection";

const connection = new PostgresConnection()

const queue = new Queue();
queue.connect();
Registry.register('dbConnection', connection);
Registry.register('rabbitMQ', queue);

const httpServer = new ExpressAdapter()

const repositoryFactory = new RepositoryFactoryDatabase(connection)
const axiosAdapter = new AxiosAdapter()
const accountGateway = new AccountGatewayHttp(axiosAdapter);
const useCaseFactory = new UseCasesFactory(repositoryFactory, accountGateway);

new RideController(httpServer, useCaseFactory);

httpServer.listen(3000);

