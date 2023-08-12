import ExpressAdapter from "./infra/http/ExpressAdapter";
import RideController from "./infra/http/RideController";
import MongoConnection from "./infra/db/MongoConnectionAdapter";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";
import UseCasesFactory from "./application/factory/UseCasesFactory";
import AxiosAdapter from "./infra/adapter/AxiosAdapter";
import AccountGatewayHttp from "./application/gateway/AccountGatewayHttp";


new MongoConnection().connect();

const httpServer = new ExpressAdapter()

const repositoryFactory = new RepositoryFactoryDatabase()
const axiosAdapter = new AxiosAdapter()
const accountGateway = new AccountGatewayHttp(axiosAdapter);
const useCaseFactory = new UseCasesFactory(repositoryFactory, accountGateway);

new RideController(httpServer, useCaseFactory);

httpServer.listen(3000);

