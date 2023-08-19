import PaymentProvider from "./PaymentProvider";
import crypto from 'crypto'; 
export default class PaypalProvider implements PaymentProvider { 
  async process(amount: number) { 
    console.log(`Payment of ${amount} completed on Paypal`)
    return { 
      paymentProviderId: crypto.randomUUID()
    }
  }
}