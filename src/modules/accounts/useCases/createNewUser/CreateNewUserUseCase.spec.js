import { config } from 'dotenv';
import { AppError } from '../../../../shared/infra/http/errors/AppError.js';

import { UserRepositoryImpInMemory } from '../../repositories/in-memory/UserRepositoryImpInMemory.js';
import { CreateNewUserUseCase } from './CreateNewUserUseCase.js';

config();

describe('Create a new User use case', () => {
  let userRepository;
  let createNewUserUseCase;

  beforeEach(() => {
    userRepository = UserRepositoryImpInMemory.getInstance();
    createNewUserUseCase = new CreateNewUserUseCase(userRepository);
  });

  it('should create a new user', async () => {
    const user = {
      name: 'testName',
      email: 'user@test.com',
      password: 'testPassword',
    };

    const { id, name, email, password } = await createNewUserUseCase.execute(
      user
    );

    expect(id).toBeDefined();
    expect(name).toEqual(user.name);
    expect(email).toEqual(user.email);
    expect(password).toBeUndefined();
  });

  it('should not create a new user with an existing email', async () => {
    const user = {
      name: 'testName',
      email: 'user@test.com',
      password: 'testPassword',
    };

    const response = createNewUserUseCase.execute(user);

    await expect(response).rejects.toEqual(
      new AppError('User already exists', 400)
    );
  });
});
