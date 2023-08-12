export default interface Database {
  connect(): Promise<void>;
}
