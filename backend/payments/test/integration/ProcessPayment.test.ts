import ProcessPayment from '../../src/application/use-cases/ProcessPayment';
import PaymentProviderTest from './gateway/PaymentProviderTest';

test("Should process a payment ", async () => {
  const paymentProvider = new PaymentProviderTest();
  const processPayment = new ProcessPayment(paymentProvider);
  const output = await processPayment.execute({
    amount: 10,
  })

  expect(output.processed).toBeTruthy();
  expect(output.paymentProviderId).toBeDefined()
})