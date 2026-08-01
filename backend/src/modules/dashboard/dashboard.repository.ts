import { Types } from "mongoose";

import { Wallet } from "@/modules/wallet/wallet.model";
import { Transaction } from "@/modules/transaction/transaction.model";
import { User } from "@/modules/user/user.model";

export class DashboardRepository {
  async getWallet(userId: string) {
    return Wallet.findOne({
      userId: new Types.ObjectId(userId),
    });
  }

  async getTransactionCount(userId: string) {
    return Transaction.countDocuments({
      userId: new Types.ObjectId(userId),
    });
  }

  async getUser(userId: string) {
    return User.findById(userId);
  }
}

export default DashboardRepository;