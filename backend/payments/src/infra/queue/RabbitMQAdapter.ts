import Queue from "./Queue";
import amqplib from 'amqplib';

export default class RabbitMQAdapter implements Queue {
  connection?: amqplib.Connection; 

  async connect(): Promise<any> {
    this.connection = await amqplib.connect("amqp://localhost:5672");
  }
  
  async consume(topic: string, callback: (message: any) => Promise<void>): Promise<any> {
    const channel = await this.connection!.createChannel();
    channel.assertQueue(topic);
    channel.consume(topic, async (message: any) => {
      try {
        await callback(JSON.parse(message.content.toString()));
        channel.ack(message);
      } catch (err) {
        channel.nack(message);
      }
    });
  }
  
  async produce(topic: string, message: any): Promise<void> {
    const channel = await this.connection!.createChannel();
    await channel.assertQueue(topic);
    await channel.sendToQueue(topic, Buffer.from(JSON.stringify(message)));
  } 

}