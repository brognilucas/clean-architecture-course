export default interface Database {
  connect(): Promise<void>;
  query(statement: string, params: any): Promise<any>
}
