import PaymentProvider from "../gateway/PaymentProvider"

export default class ProcessPayment { 
  
  constructor(private readonly paymentProvider: PaymentProvider){
  }

  async execute(input: Input): Promise<Output> { 
    const output = await this.paymentProvider.process(input.amount)

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