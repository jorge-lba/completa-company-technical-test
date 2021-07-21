import { Router } from 'express';

import { User } from '../../../../modules/accounts/infra/sequelize/entities/User.js';
import { UserRepositoryImp } from '../../../../modules/accounts/infra/sequelize/repositories/UserRepositoryImp.js';

import { CreateNewUserUseCase } from '../../../../modules/accounts/useCases/createNewUser/CreateNewUserUseCase.js';
import { ShowByUserIdUseCase } from '../../../../modules/accounts/useCases/showByUserId/ShowByUserIdUseCase.js';
import { ListAllUsersUseCase } from '../../../../modules/accounts/useCases/listAllUsers/ListAllUsersUseCase.js';
import { UpdateByUserIdUseCase } from '../../../../modules/accounts/useCases/updateByUserId/UpdateByUserIdUseCase.js';
import { ChangePasswordByUserIdUseCase } from '../../../../modules/accounts/useCases/changePasswordByUserId/ChangePasswordByUserIdUseCase.js';

import { CreateNewUserController } from '../../../../modules/accounts/useCases/createNewUser/CreateNewUserController.js';
import { ShowByUserIdController } from '../../../../modules/accounts/useCases/showByUserId/ShowByUserIdController.js';
import { ListAllUsersController } from '../../../../modules/accounts/useCases/listAllUsers/ListAllUsersController.js';
import { UpdateByUserIdController } from '../../../../modules/accounts/useCases/updateByUserId/UpdateByUserIdController.js';
import { ChangePasswordByUserIdController } from '../../../../modules/accounts/useCases/changePasswordByUserId/ChangePasswordByUserIdController.js';

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
const updateByUserIdUseCase = new UpdateByUserIdUseCase(
  new UserRepositoryImp(User)
);
const changePasswordByIdUseCase = new ChangePasswordByUserIdUseCase(
  new UserRepositoryImp(User)
);

const createNewUserController = new CreateNewUserController(
  createNewUserUseCase
);
const showByUserIdController = new ShowByUserIdController(showByUserIdUseCase);
const listAllUsersController = new ListAllUsersController(listAllUserUseCase);
const updateByUserIdController = new UpdateByUserIdController(
  updateByUserIdUseCase
);
const changePasswordByIdController = new ChangePasswordByUserIdController(
  changePasswordByIdUseCase
);

userRoutes.post('/', (req, res) => createNewUserController.handle(req, res));
userRoutes.get('/:user_id', (req, res) =>
  showByUserIdController.handle(req, res)
);
userRoutes.get('/', (req, res) => listAllUsersController.handle(req, res));
userRoutes.put('/:user_id', (req, res) =>
  updateByUserIdController.handle(req, res)
);
userRoutes.put('/:user_id/password', (req, res) =>
  changePasswordByIdController.handle(req, res)
);

export { userRoutes };
