import { PaymentGateway } from "./paymentGateway.interface";

export class SSLCommerzGateway
  implements PaymentGateway
{
  async createPayment(data: {
    paymentId: string;
    amount: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    successUrl: string;
    failUrl: string;
    cancelUrl: string;
  }) {
    console.log(
      "[SSLCommerz Mock] Create Payment:",
      data
    );

    return {
      paymentUrl: `${data.successUrl}?paymentId=${data.paymentId}&status=success`,
      gatewayTransactionId: `SSL-${Date.now()}`,
    };
  }

  async verifyPayment(
    gatewayTransactionId: string
  ) {
    console.log(
      "[SSLCommerz Mock] Verify:",
      gatewayTransactionId
    );

    return {
      success: true,
      transactionId: gatewayTransactionId,
      raw: {
        gateway: "SSLCommerz Mock",
      },
    };
  }
}

export default new SSLCommerzGateway();