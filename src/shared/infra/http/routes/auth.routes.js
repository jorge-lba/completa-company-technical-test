import { Router } from 'express';

import { connection } from '../../sequelize/index.js';

import { DayjsDateProviderImp } from '../../../providers/DateProvider/implementations/DayjsDateProviderImp.js';

import { User } from '../../../../modules/accounts/infra/sequelize/entities/User.js';
import { Token } from '../../../../modules/accounts/infra/sequelize/entities/Token.js';

import { UserRepositoryImp } from '../../../../modules/accounts/infra/sequelize/repositories/UserRepositoryImp.js';
import { UserTokenRepositoryImp } from '../../../../modules/accounts/infra/sequelize/repositories/UserTokenRespositoryImp.js';

import { AuthenticateUserUseCase } from '../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase.js';

import { AuthenticateUserController } from '../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController.js';

const authRoutes = Router();

Token.init(connection);
User.init(connection);

const authenticateUserUseCase = new AuthenticateUserUseCase(
  new UserRepositoryImp(User),
  new UserTokenRepositoryImp(Token),
  new DayjsDateProviderImp()
);

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
);

authRoutes.post('/', (req, res) => authenticateUserController.handle(req, res));

export { authRoutes };
