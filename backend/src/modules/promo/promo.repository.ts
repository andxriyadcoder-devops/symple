import { Promo } from "./promo.model";
import { IPromoDocument } from "./promo.types";

export class PromoRepository {
  async create(data: Partial<IPromoDocument>) {
    return Promo.create(data);
  }

  async findAll() {
    return Promo.find().sort({
      createdAt: -1,
    });
  }

  async findActive() {
    return Promo.find({
      isActive: true,
    }).sort({
      createdAt: -1,
    });
  }

  async findById(id: string) {
    return Promo.findById(id);
  }

  async findByCode(code: string) {
    return Promo.findOne({
      code: code.toUpperCase(),
    });
  }

  async update(
    id: string,
    data: Partial<IPromoDocument>
  ) {
    return Promo.findByIdAndUpdate(
      id,
      data,
      {
        returnDocument: "after",
      }
    );
  }

  async increaseUsedCount(id: string) {
    return Promo.findByIdAndUpdate(
      id,
      {
        $inc: {
          usedCount: 1,
        },
      },
      {
        returnDocument: "after",
      }
    );
  }

  async delete(id: string) {
    return Promo.findByIdAndDelete(id);
  }
}

export default new PromoRepository();