import SessionModel from "./session.model";

export class SessionRepository {
  async create(data: any) {
    return SessionModel.create(data);
  }

  async findByRefreshToken(
    refreshToken: string
  ) {
    return SessionModel.findOne({
      refreshToken,
      isRevoked: false,
    });
  }

  async revokeSession(id: string) {
    return SessionModel.findByIdAndUpdate(
      id,
      {
        isRevoked: true,
      },
      {
        new: true,
      }
    );
  }

  async revokeAllUserSessions(
    userId: string
  ) {
    return SessionModel.updateMany(
      {
        userId,
      },
      {
        isRevoked: true,
      }
    );
  }

  async updateLastUsed(id: string) {
    return SessionModel.findByIdAndUpdate(
      id,
      {
        lastUsedAt: new Date(),
      },
      {
        new: true,
      }
    );
  }
}

export default new SessionRepository();