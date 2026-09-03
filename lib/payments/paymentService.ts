import type { CreatePaymentInput, PaymentIntent, PaymentProvider } from "./types";

class UnconfiguredPaymentProvider implements PaymentProvider {
  async createPayment(_input: CreatePaymentInput): Promise<PaymentIntent> { throw new Error("No payment provider is configured."); }
  async getPaymentStatus(_paymentId: string): Promise<PaymentIntent> { throw new Error("No payment provider is configured."); }
  async verifyCallback(_payload: string, _signature: string): Promise<PaymentIntent> { throw new Error("No payment provider is configured."); }
}

let provider: PaymentProvider = new UnconfiguredPaymentProvider();

export function setPaymentProvider(nextProvider: PaymentProvider) { provider = nextProvider; }
export function getPaymentProvider() { return provider; }
export function createPayment(input: CreatePaymentInput) { return provider.createPayment(input); }
export function getPaymentStatus(paymentId: string) { return provider.getPaymentStatus(paymentId); }
export function verifyPaymentCallback(payload: string, signature: string) { return provider.verifyCallback(payload, signature); }