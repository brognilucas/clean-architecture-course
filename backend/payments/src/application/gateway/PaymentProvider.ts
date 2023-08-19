export default interface PaymentProvider {
  process(amount: number): Promise<Output>
}

type Output = {
  paymentProviderId: string
}