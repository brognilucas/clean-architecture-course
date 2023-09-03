import TransactionRepository from "../../application/repository/TransactionRepository";
import Transaction from "../../domain/Transaction";
import DatabaseConnection from "../db/DatabaseConnect";

export default class TransactionRepositoryPostgres implements TransactionRepository {
  constructor(private connection: DatabaseConnection) { }

  async save(transaction: Transaction): Promise<void> {
    await this.connection.query('INSERT INTO transactions (id, ride_id, amount, date) VALUES ($1, $2, $3, $4)', [transaction.id, transaction.rideId, transaction.amount, transaction.date])
  }

  async getById(transactionId: string): Promise<Transaction | null> {
    const [transactionData] = await this.connection.query("SELECT * FROM transactions where ID = $1", [transactionId])
    if (!transactionData) {
      return null;
    }
    return new Transaction(transactionData.id, transactionData.amount, transactionData.ride_id, transactionData.date);
  }

}