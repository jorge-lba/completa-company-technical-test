import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';

import { UserRepositoryImpInMemory } from '../../repositories/in-memory/UserRepositoryImpInMemory.js';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase.js';
import { UserTokenRepositoryImpInMemory } from '../../repositories/in-memory/UserTokenRepositoryImpInMemory.js';
import { DayjsDateProviderImp } from '../../../../shared/providers/DateProvider/implementations/DayjsDateProviderImp.js';

import auth from '../../../../config/authentication.js';

config();

describe('Authenticate user Use Case', () => {
  let userRepository;
  let dateProvider;
  let authenticateUserUseCase;
  let userTokenRepository;

  beforeEach(() => {
    userRepository = UserRepositoryImpInMemory.getInstance();
    dateProvider = new DayjsDateProviderImp();
    userTokenRepository = new UserTokenRepositoryImpInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepository,
      userTokenRepository,
      dateProvider
    );
  });

  it('should authenticate user', async () => {
    const user = {
      name: 'userToken',
      email: 'token@test.com',
      password: 'testToken',
    };

    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(process.env.HASH_SALT_OR_ROUNDS)
    );

    await userRepository.create({
      ...user,
      password: hashedPassword,
    });

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

    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(process.env.HASH_SALT_OR_ROUNDS)
    );

    const { id: userId } = await userRepository.create({
      ...user,
      password: hashedPassword,
    });

    await userRepository.create({
      ...user,
      email: `2${user.email}`,
    });

    const { token, refresh_token } = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    const tokenIsValid = jwt.verify(token, auth.secret_token);
    const refreshTokenIsValid = jwt.verify(
      refresh_token,
      auth.secret_refresh_token
    );

    expect(token).toBeTruthy();
    expect(tokenIsValid.sub).toBe(userId);

    expect(refresh_token).toBeTruthy();
    expect(refreshTokenIsValid.sub).toBe(userId);
    expect(refreshTokenIsValid.email).toBe(user.email);
  });
});
