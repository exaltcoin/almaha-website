export type PaymentStatus = "PENDING" | "AUTHORIZED" | "CAPTURED" | "FAILED" | "REFUNDED";

export interface CreatePaymentInput {
  projectId: string;
  amountMinor: number;
  currency: string;
  returnUrl: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntent {
  id: string;
  status: PaymentStatus;
  provider: string;
  checkoutUrl?: string;
}

export interface PaymentProvider {
  createPayment(input: CreatePaymentInput): Promise<PaymentIntent>;
  getPaymentStatus(paymentId: string): Promise<PaymentIntent>;
  verifyCallback(payload: string, signature: string): Promise<PaymentIntent>;
  refund?(paymentId: string, amountMinor?: number): Promise<PaymentIntent>;
}