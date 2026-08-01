import { PaymentGateway } from "./paymentGateway.interface";

export class NagadGateway
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
      paymentUrl: `${data.successUrl}?paymentId=${data.paymentId}&gateway=nagad`,
      gatewayTransactionId: `NAGAD-${Date.now()}`,
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
        gateway: "Nagad Mock",
      },
    };
  }
}

export default new NagadGateway();