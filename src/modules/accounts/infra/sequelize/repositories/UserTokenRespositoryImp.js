import { v4 as uuid } from 'uuid';

import { UserTokenRepository } from '../../../repositories/UserTokenRepository.js';
import { Token } from '../entities/Token.js';

class UserTokenRepositoryImp extends UserTokenRepository {
  constructor() {
    super();
    this.repository = Token;
  }

  async save({ user_id, expires_date, refresh_token }) {
    const userToken = {
      id: uuid(),
      user_id,
      expires_date,
      refresh_token,
    };

    const token = await this.repository.create(userToken);

    return token;
  }

  async findByUserIdAndRefreshToken({ user_id, refresh_token }) {
    const userToken = await this.repository.findOne({
      where: {
        user_id,
        refresh_token,
      },
    });

    return userToken;
  }

  async deleteById(id) {
    await this.repository.destroy({ where: { id } });
  }
}

export { UserTokenRepositoryImp };
