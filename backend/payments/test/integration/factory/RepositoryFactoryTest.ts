import RepositoryFactory from "../../../src/application/factory/RepositoryFactory";
import TransactionRepository from "../../../src/application/repository/TransactionRepository";
import TransactionRepositoryTest from "../queue/repositories/TransactionRepositoryTest";
export default class RepositoryFactoryTest implements RepositoryFactory {
  private transactionRepository?: TransactionRepository

  createTransactionRepository(): TransactionRepository {
    if (!this.transactionRepository) {
      this.transactionRepository = new TransactionRepositoryTest();
    }

    return this.transactionRepository;
  }
}