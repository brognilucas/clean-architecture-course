import ProcessPayment from '../../src/application/use-cases/ProcessPayment';
import { QueueTopics } from '../../src/infra/topics/QueueTopics';
import QueueTest from './QueueTest';
import PaymentProviderTest from './gateway/PaymentProviderTest';

let queue = new QueueTest();

test("Should process a payment ", async () => {
  const paymentProvider = new PaymentProviderTest();
  const processPayment = new ProcessPayment(paymentProvider, queue);
  const output = await processPayment.execute({
    amount: 10,
  })

  expect(output.processed).toBeTruthy();
  expect(output.paymentProviderId).toBeDefined()
  
  queue.consume(QueueTopics.PAYMENT_PROCESSED, async (message) => {
    expect(message.amount).toEqual(10)
    expect(message.paymentProviderId).toEqual(output.paymentProviderId)
  })
})