import { Payment } from "./payment.model";
import { IPaymentDocument } from "./payment.types";

export class PaymentRepository {
  async create(
    data: Partial<IPaymentDocument>
  ) {
    return Payment.create(data);
  }

  async findById(id: string) {
    return Payment.findById(id);
  }

  async findByPaymentId(
    paymentId: string
  ) {
    return Payment.findOne({
      paymentId,
    });
  }

  async findByUser(userId: string) {
    return Payment.find({
      userId,
    }).sort({
      createdAt: -1,
    });
  }

  async findAll() {
    return Payment.find()
      .populate(
        "userId",
        "fullName username email"
      )
      .sort({
        createdAt: -1,
      });
  }

  async update(
    id: string,
    data: Partial<IPaymentDocument>
  ) {
    return Payment.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
  }

  async delete(id: string) {
    return Payment.findByIdAndDelete(id);
  }
}

export default new PaymentRepository();