export interface PaymentGateway {
  createPayment(data: {
    paymentId: string;
    amount: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    successUrl: string;
    failUrl: string;
    cancelUrl: string;
  }): Promise<{
    paymentUrl: string;
    gatewayTransactionId?: string;
  }>;

  verifyPayment(
    gatewayTransactionId: string
  ): Promise<{
    success: boolean;
    transactionId?: string;
    amount?: number;
    raw?: unknown;
  }>;
}