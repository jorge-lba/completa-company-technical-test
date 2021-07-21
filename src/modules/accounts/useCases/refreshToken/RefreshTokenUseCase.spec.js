import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';

import { DayjsDateProviderImp } from '../../../../shared/providers/DateProvider/implementations/DayjsDateProviderImp.js';
import { UserRepositoryImpInMemory } from '../../repositories/in-memory/UserRepositoryImpInMemory.js';
import { UserTokenRepositoryImpInMemory } from '../../repositories/in-memory/UserTokenRepositoryImpInMemory.js';
import { AuthenticateUserUseCase } from '../authenticateUser/AuthenticateUserUseCase.js';
import { RefreshTokenUseCase } from './RefreshTokenUseCase.js';

import auth from '../../../../config/authentication.js';

config();

describe('Refresh token use case', () => {
  let userRepository;
  let dateProvider;
  let userTokenRepository;
  let authenticateUserUseCase;
  let refreshTokenUseCase;

  beforeEach(() => {
    userRepository = UserRepositoryImpInMemory.getInstance();
    dateProvider = new DayjsDateProviderImp();
    userTokenRepository = new UserTokenRepositoryImpInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepository,
      userTokenRepository,
      dateProvider
    );
    refreshTokenUseCase = new RefreshTokenUseCase();
  });

  it('should refresh token', async () => {
    const user = {
      name: 'userToken',
      email: 'token@test.com',
      password: 'testToken',
    };

    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(process.env.HASH_SALT_OR_ROUNDS)
    );

    const { id: userId } = await userRepository.create({
      ...user,
      password: hashedPassword,
    });

    const { refresh_token } = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    const newRefreshToken = await refreshTokenUseCase.execute(refresh_token);

    const newRefreshTokenIsValid = jwt.verify(
      refresh_token,
      auth.secret_refresh_token
    );

    expect(newRefreshToken).toBeTruthy();
    expect(newRefreshTokenIsValid.sub).toBe(userId);
  });
});
