import { Router } from 'express';

import { User } from '../../../../modules/accounts/infra/sequelize/entities/User.js';
import { UserRepositoryImp } from '../../../../modules/accounts/infra/sequelize/repositories/UserRepositoryImp.js';

import { CreateNewUserUseCase } from '../../../../modules/accounts/useCases/createNewUser/CreateNewUserUseCase.js';
import { ShowByUserIdUseCase } from '../../../../modules/accounts/useCases/showByUserId/ShowByUserIdUseCase.js';
import { ListAllUsersUseCase } from '../../../../modules/accounts/useCases/listAllUsers/ListAllUsersUseCase.js';

import { CreateNewUserController } from '../../../../modules/accounts/useCases/createNewUser/CreateNewUserController.js';
import { ShowByUserIdController } from '../../../../modules/accounts/useCases/showByUserId/ShowByUserIdController.js';
import { ListAllUsersController } from '../../../../modules/accounts/useCases/listAllUsers/ListAllUsersController.js';

import { connection } from '../../sequelize/index.js';

const userRoutes = Router();

User.init(connection);

const createNewUserUseCase = new CreateNewUserUseCase(
  new UserRepositoryImp(User)
);
const showByUserIdUseCase = new ShowByUserIdUseCase(
  new UserRepositoryImp(User)
);
const listAllUserUseCase = new ListAllUsersUseCase(new UserRepositoryImp(User));

const createNewUserController = new CreateNewUserController(
  createNewUserUseCase
);
const showByUserIdController = new ShowByUserIdController(showByUserIdUseCase);
const listAllUsersController = new ListAllUsersController(listAllUserUseCase);

userRoutes.post('/', (ree, res) => createNewUserController.handle(ree, res));
userRoutes.get('/:user_id', (ree, res) =>
  showByUserIdController.handle(ree, res)
);
userRoutes.get('/', (ree, res) => listAllUsersController.handle(ree, res));

export { userRoutes };
