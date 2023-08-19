import TransactionRepository from "../../../../src/application/repository/TransactionRepository";
import Transaction from "../../../../src/domain/Transaction";

export default class TransactionRepositoryTest implements TransactionRepository {
  transactions: Transaction[] = [];
  
  async save(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }
  
  async getById(transactionId: string): Promise<Transaction | null> {
    const transaction = this.transactions.find((t) => t.id === transactionId);
    return transaction ?? null;
  } 

}