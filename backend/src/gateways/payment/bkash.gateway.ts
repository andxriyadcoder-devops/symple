import { PaymentGateway } from "./paymentGateway.interface";

export class BkashGateway
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
    return {
      paymentUrl: `${data.successUrl}?paymentId=${data.paymentId}&gateway=bkash`,
      gatewayTransactionId: `BKASH-${Date.now()}`,
    };
  }

  async verifyPayment(
    gatewayTransactionId: string
  ) {
    return {
      success: true,
      transactionId: gatewayTransactionId,
      amount: 0,
      raw: {
        gateway: "bKash Mock",
      },
    };
  }
}

export default new BkashGateway();