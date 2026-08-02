import { Transaction } from "./transaction.model";
import { ITransactionDocument } from "./transaction.types";
import { TransactionType } from "@/shared/enums";

export class TransactionRepository {
  async create(data: Partial<ITransactionDocument>) {
    return Transaction.create(data);
  }

  async findByWalletId(walletId: string) {
    return Transaction.find({ walletId }).sort({
      createdAt: -1,
    });
  }

  async findMyTransactions(
    userId: string,
    page: number,
    limit: number,
    type?: string,
    search?: string,
  ) {
    const query: any = {
      userId,
    };

    // Type Filter
    if (type && type !== "ALL") {
      query.type = type;
    }

    // Search
    if (search) {
      query.$or = [
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          reference: {
            $regex: search,
            $options: "i",
          },
        },
        {
          transactionId: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const skip = (page - 1) * limit;

    const transactions = await Transaction.find(query)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const total = await Transaction.countDocuments(query);

    return {
      transactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findTodayDailyLogin(userId: string) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return Transaction.findOne({
      userId,
      type: TransactionType.DAILY_LOGIN,
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });
  }

  async getAllWithdrawRequests() {
    return Transaction.find({
      type: TransactionType.WITHDRAW_REQUEST,
    })
      .populate("userId", "fullName username email")
      .sort({
        createdAt: -1,
      });
  }

  async findById(id: string) {
    return Transaction.findById(id);
  }

  async updateStatus(id: string, status: string) {
    return Transaction.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
  }
}

export default new TransactionRepository();