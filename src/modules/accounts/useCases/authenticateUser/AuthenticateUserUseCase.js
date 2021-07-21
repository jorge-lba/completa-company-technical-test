import jsonwebtoken from 'jsonwebtoken';
import { compare } from 'bcrypt';

import auth from '../../../../config/authentication.js';

class AuthenticateUserUseCase {
  constructor(userRepository, userTokenRepository, dateProvider) {
    this.userRepository = userRepository;
    this.userTokenRepository = userTokenRepository;
    this.dateProvider = dateProvider;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new Error('Email or password incorrect!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email or password incorrect!');
    }

    const {
      expires_in_token,
      expires_in_refresh_token,
      secret_token,
      secret_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const token = jsonwebtoken.sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = jsonwebtoken.sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    );

    await this.userTokenRepository.save({
      token,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    return {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}

export { AuthenticateUserUseCase };
