export default interface Queue { 
  connect(): Promise<any>;

  consume(topic: string, callback: Callback): Promise<any>

  produce(topic: string, message: any): Promise<void>
}

type Callback = (message: any) => Promise<any>