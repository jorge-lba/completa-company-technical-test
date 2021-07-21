import jsonwebtoken from 'jsonwebtoken';

import auth from '../../../../config/authentication.js';

class AuthenticateUserUseCase {
  constructor(userRepository, userTokenRepository) {
    this.userRepository = userRepository;
    this.userTokenRepository = userTokenRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findOneByEmail(email);

    const passwordMatch = user.password === password;

    if (!passwordMatch) {
      throw new Error('Email or password incorrect!');
    }

    const {
      expires_in_token,
      expires_in_refresh_token,
      secret_token,
      secret_refresh_token,
    } = auth;

    const token = jsonwebtoken.sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refreshToken = jsonwebtoken.sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    return {
      token,
      refreshToken,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}

export { AuthenticateUserUseCase };
