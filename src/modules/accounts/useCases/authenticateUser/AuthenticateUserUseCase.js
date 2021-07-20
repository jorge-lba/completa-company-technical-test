import jsonwebtoken from 'jsonwebtoken';

import auth from '../../../../config/authentication.js';

class AuthenticateUserUseCase {
  constructor(userTokenRepository, userRepository) {
    this.userTokenRepository = userTokenRepository;
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findOneByEmail(email);

    const passwordMatch = user.password === password;

    if (!passwordMatch) {
      throw new Error('Email or password incorrect!');
    }

    const { expires_in_token, secret_token } = auth;

    const token = jsonwebtoken.sign({ email }, secret_token, {
      expiresIn: expires_in_token,
    });

    return token;
  }
}

export { AuthenticateUserUseCase };
