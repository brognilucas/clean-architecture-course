import RepositoryFactory from "../../application/factory/RepositoryFactory";
import TransactionRepository from "../../application/repository/TransactionRepository";
import DatabaseConnection from '../db/DatabaseConnect';
import TransactionRepositoryPostgres from "../repositories/TransactionRepositoryPostgres";
export default class RepositoryFactoryDatabase implements RepositoryFactory {
  constructor(private connection: DatabaseConnection){}
  private transactionRepository?: TransactionRepository; 

  createTransactionRepository(): TransactionRepository {
    if (!this.transactionRepository){ 
      this.transactionRepository = new TransactionRepositoryPostgres(this.connection);
    }

    return this.transactionRepository;
  }
}