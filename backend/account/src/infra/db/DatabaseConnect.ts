export default interface DatabaseConnection {
  connect(): Promise<void>;
  query (statement: string, params: any): Promise<any>;
	close (): Promise<void>;
}
