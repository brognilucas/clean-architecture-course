import Queue from "../../infra/queue/Queue"
import { QueueTopics } from "../../infra/topics/QueueTopics"
import PaymentProvider from "../gateway/PaymentProvider"

export default class ProcessPayment { 
  
  constructor(
    private readonly paymentProvider: PaymentProvider,
    private readonly queue: Queue
  ){
  }

  async execute(input: Input): Promise<Output> { 
    const output = await this.paymentProvider.process(input.amount)

    await this.queue.produce(QueueTopics.PAYMENT_PROCESSED, {
      amount: input.amount,
      paymentProviderId: output.paymentProviderId
    });
    
    return {
      processed: true, 
      paymentProviderId: output.paymentProviderId
    }
  }
}

type Input = {
  amount: number,
}

type Output = {
  paymentProviderId: string
  processed: boolean
}