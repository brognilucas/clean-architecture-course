import Transaction from "../../domain/Transaction";

export default interface TransactionRepository { 
  save(transaction: Transaction): Promise<void>
  getById(transactionId: string): Promise<Transaction | null>
}