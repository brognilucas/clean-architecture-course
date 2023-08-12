import TransactionRepository from "../../application/repository/TransactionRepository";
import Transaction from "../../domain/Transaction";
import { TransactionModel } from "../schemas/TransactionSchema";

export default class TransactionRepositoryDatabase implements TransactionRepository {
  
  async save(transaction: Transaction): Promise<void> {
    await TransactionModel.create(transaction);
  }
  
  async getById(transactionId: string): Promise<Transaction | null> {
    const transaction = await TransactionModel.findOne({ id: transactionId });
    if (!transaction) { 
      return null;
    }
    return new Transaction(transaction.id, transaction.amount, transaction.rideId, transaction.date);
  } 
}