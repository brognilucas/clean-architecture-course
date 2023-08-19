import Queue from "../../../src/infra/queue/Queue";

export default class QueueTest implements Queue{
  connection?: any;

  messages = new Map();
  
  async connect(): Promise<void> {
    console.log("QueueTest connect")
  }
  
  async publish(queue: string, message: any): Promise<void> {
    this.messages.set(queue, message);
  }

  async consume(queue: string, callback: (message: any) => Promise<void>): Promise<void> {
    const messages = this.messages.get(queue);
    try { 
      const message = messages.shift();
      await callback(message);
      this.messages.set(queue, messages);
    } catch (error: any) {
      console.log(`Error processing ${queue} message: ${error.message}`)
    }
  } 
}