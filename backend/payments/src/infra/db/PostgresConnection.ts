import postgres from 'pg-promise';
import DatabaseConnection from './DatabaseConnect';

export default class PostgresConnection implements DatabaseConnection {
  constructor() {
    this.connect();
  }

  private connection: any;

  async connect(): Promise<void> {
    this.connection = await postgres()("postgres://payments:psd-payments-db@localhost:5434/payments")
  }

  async query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params)
  }

  async close(): Promise<void> {
    await this.connection.$pool.end()
  }
}
