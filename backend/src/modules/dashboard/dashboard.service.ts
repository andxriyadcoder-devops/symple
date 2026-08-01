import DashboardRepository from "./dashboard.repository";
import { AppError } from "@/shared/errors/AppError";

export class DashboardService {
  private repository = new DashboardRepository();

  async getDashboard(userId: string) {
    console.log("Dashboard User ID:", userId);

    const wallet = await this.repository.getWallet(userId);

    console.log("Wallet Found:", wallet);

    const user = await this.repository.getUser(userId);
    const transactionCount =
      await this.repository.getTransactionCount(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return {
      wallet: {
        coinBalance: wallet?.coinBalance ?? 0,
        cashBalance: wallet?.cashBalance ?? 0,
      },
      transactions: transactionCount,
      rewards: 0,
      referralCode: user.referralCode,
    };
  }
}

export default new DashboardService();