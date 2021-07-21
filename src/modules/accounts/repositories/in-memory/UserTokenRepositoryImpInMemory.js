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

  async findByUserIdAndRefreshToken({ user_id, refresh_token }) {
    const userToken = this.usersToken.find((userToken) => {
      console.log(userToken);

      return (
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
      );
    });

    return userToken;
  }
}

export { UserTokenRepositoryImpInMemory };
