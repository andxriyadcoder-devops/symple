import sessionRepository from "./session.repository";

export class SessionService {
  async createSession(data: {
    userId: string;
    refreshToken: string;
    device?: string;
    ipAddress?: string;
    userAgent?: string;
    expiresAt: Date;
  }) {
    return sessionRepository.create(data);
  }

  async findByRefreshToken(
    refreshToken: string
  ) {
    return sessionRepository.findByRefreshToken(
      refreshToken
    );
  }

  async revokeSession(id: string) {
    return sessionRepository.revokeSession(id);
  }

  async revokeAllUserSessions(
    userId: string
  ) {
    return sessionRepository.revokeAllUserSessions(
      userId
    );
  }

  async updateLastUsed(id: string) {
    return sessionRepository.updateLastUsed(id);
  }
}

export default new SessionService();