import { Router } from 'express';

import { DayjsDateProviderImp } from '../../../providers/DateProvider/implementations/DayjsDateProviderImp.js';

import { User } from '../../../../modules/accounts/infra/sequelize/entities/User.js';
import { Token } from '../../../../modules/accounts/infra/sequelize/entities/Token.js';

import { UserRepositoryImp } from '../../../../modules/accounts/infra/sequelize/repositories/UserRepositoryImp.js';
import { UserTokenRepositoryImp } from '../../../../modules/accounts/infra/sequelize/repositories/UserTokenRespositoryImp.js';

import { AuthenticateUserUseCase } from '../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase.js';
import { RefreshTokenUseCase } from '../../../../modules/accounts/useCases/refreshToken/RefreshTokenUseCase.js';

import { AuthenticateUserController } from '../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController.js';
import { RefreshTokenController } from '../../../../modules/accounts/useCases/refreshToken/RefreshTokenController.js';

const authRoutes = Router();

const authenticateUserUseCase = new AuthenticateUserUseCase(
  new UserRepositoryImp(User),
  new UserTokenRepositoryImp(Token),
  new DayjsDateProviderImp()
);
const refreshTokenUseCase = new RefreshTokenUseCase(
  new UserTokenRepositoryImp(Token),
  new DayjsDateProviderImp()
);

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
);
const refreshTokenController = new RefreshTokenController(refreshTokenUseCase);

authRoutes.post('/', (req, res) => authenticateUserController.handle(req, res));
authRoutes.post('/refresh', (req, res) =>
  refreshTokenController.handle(req, res)
);

export { authRoutes };
