import PaymentProvider from "../../../src/application/gateway/PaymentProvider";
import crypto from 'crypto';

export default class PaymentProviderTest implements PaymentProvider {
  
  async process(_amount: number){
    return {
      paymentProviderId: crypto.randomUUID()
    }    
  }
}