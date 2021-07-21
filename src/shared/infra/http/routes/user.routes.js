import { Router } from 'express';
import { User } from '../../../../modules/accounts/infra/sequelize/entities/User.js';
import { UserRepositoryImp } from '../../../../modules/accounts/infra/sequelize/repositories/UserRepositoryImp.js';
import { CreateNewUserController } from '../../../../modules/accounts/useCases/createNewUser/CreateNewUserController.js';
import { CreateNewUserUseCase } from '../../../../modules/accounts/useCases/createNewUser/CreateNewUserUseCase.js';
import { connection } from '../../sequelize/index.js';

const userRoutes = Router();

User.init(connection);

const createNewUserUseCase = new CreateNewUserUseCase(
  new UserRepositoryImp(User)
);

const createNewUserController = new CreateNewUserController(
  createNewUserUseCase
);

userRoutes.post('/', (ree, res) => createNewUserController.handle(ree, res));

export { userRoutes };
