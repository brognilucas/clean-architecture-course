import Queue from "../queue/Queue";
import amqplib from 'amqplib';

export default class RabbitMQAdapter implements Queue {
  connection?: amqplib.Connection;

  async connect(): Promise<void> {
    this.connection = await amqplib.connect('amqp://localhost:5672');
  }

  async publish(queue: string, message: any): Promise<void> {
    const channel = await this.connection!.createChannel();
    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async consume(queue: string, callback: Callback): Promise<void> {
    const channel = await this.connection!.createChannel();
    channel.assertQueue(queue);
    channel.consume(queue, async (message: any) => {
      try {
        await callback(JSON.parse(message.content.toString()));
        channel.ack(message);
      } catch (err) {
        channel.nack(message);
      }
    });
  }
}

type Callback = (message: any) => Promise<void>;