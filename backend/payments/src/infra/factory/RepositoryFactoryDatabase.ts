import RepositoryFactory from "../../application/factory/RepositoryFactory";
import TransactionRepository from "../../application/repository/TransactionRepository";
import TransactionRepositoryDatabase from "../repositories/TransactionRepositoryDatabase";

export default class RepositoryFactoryDatabase implements RepositoryFactory {
  private transactionRepository?: TransactionRepository; 

  createTransactionRepository(): TransactionRepository {
    if (!this.transactionRepository){ 
      this.transactionRepository = new TransactionRepositoryDatabase()
    }

    return this.transactionRepository;
  }
}