export default interface Queue { 
  connection?: any;
  connect(): Promise<void>
  publish(queue: string, message: any): Promise<void>
  consume(queue: string, callback: (message: any) => Promise<void>): Promise<void>
}