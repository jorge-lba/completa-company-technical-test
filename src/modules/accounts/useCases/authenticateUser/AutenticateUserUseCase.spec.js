import jwt from 'jsonwebtoken';

import { UserRepositoryImpInMemory } from '../../repositories/in-memory/UserRepositoryImpInMemory.js';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase.js';

import auth from '../../../../config/authentication.js';

describe('Authenticate user Use Case', () => {
  let userRepository;
  let authenticateUserUseCase;

  beforeEach(() => {
    userRepository = UserRepositoryImpInMemory.getInstance();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
  });

  it('should authenticate user', async () => {
    const user = {
      name: 'userToken',
      email: 'token@test.com',
      password: 'testToken',
    };

    await userRepository.create(user);

    const { token } = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(token).toBeTruthy();
  });

  it(`must contain a token and a refresh token`, async () => {
    const user = {
      name: 'userRefreshToken',
      email: 'refreshToken@test.com',
      password: 'testRefreshToken',
    };

    const { id: userId } = await userRepository.create(user);

    const { token, refreshToken } = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    const tokenIsValid = jwt.verify(token, auth.secret_token);
    const refreshTokenIsValid = jwt.verify(
      refreshToken,
      auth.secret_refresh_token
    );

    console.log(tokenIsValid);
    console.log(refreshTokenIsValid);

    expect(token).toBeTruthy();
    expect(tokenIsValid.subject).toBe(userId);

    expect(refreshToken).toBeTruthy();
    expect(refreshTokenIsValid.subject).toBe(userId);
    expect(refreshTokenIsValid.email).toBe(user.email);
  });
});
