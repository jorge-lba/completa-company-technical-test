import jwt from 'jsonwebtoken';

import auth from '../../../../config/authentication.js';

class RefreshTokenUseCase {
  constructor(userTokenRepository, dateProvider) {
    this.userTokenRepository = userTokenRepository;
    this.dateProvider = dateProvider;
  }

  async execute(refresh_token) {
    const {
      expires_in_refresh_token,
      secret_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const { email, sub: user_id } = jwt.verify(
      refresh_token,
      secret_refresh_token
    );
    const userToken =
      await this.userTokenRepository.findByUserIdAndRefreshToken({
        user_id,
        refresh_token,
      });

    if (!userToken) {
      throw new Error('Refresh token does not exists!');
    }

    await this.userTokenRepository.deleteById(userToken.id);

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    );

    const new_refresh_token = jwt.sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id,
    });

    return new_refresh_token;
  }
}

export { RefreshTokenUseCase };
