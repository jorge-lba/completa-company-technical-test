import { UserTokenRepository } from '../UserTokenRepository.js';

class UserTokenRepositoryImpInMemory extends UserTokenRepository {
  constructor(repository) {
    super(repository);
    this.usersToken = [];
  }

  async save({ user_id, expires_date, refresh_token }) {
    const userToken = {
      user_id,
      expires_date,
      refresh_token,
    };

    this.usersToken.push(userToken);

    return userToken;
  }
}

export { UserTokenRepositoryImpInMemory };
