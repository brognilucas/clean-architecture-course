import CreateTransaction from "../../application/use-cases/CreateTransaction";
import ProcessPayment from "../../application/use-cases/ProcessPayment";
import Queue from "../queue/Queue";
import { QueueTopics } from "../topics/QueueTopics";

export default class QueueControllers {

  constructor(
    private createTransaction: CreateTransaction,
    private processPayment: ProcessPayment,
    private queue: Queue
  ) {
    this.registerQueue();
  }

  private async registerQueue() {
    this.queue.consume(QueueTopics.RIDE_COMPLETED, async (message) => {
      await this.createTransaction.execute({
        rideId: message.rideId,
        amount: message.price,
        date: message.completedAt,
      })
    });

    this.queue.consume(QueueTopics.TRANSACTION_CREATED, async (message) => {
      await this.processPayment.execute({
        amount: message.amount
      })
    })

  }
}