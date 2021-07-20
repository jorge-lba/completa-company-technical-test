import { UserRepositoryImpInMemory } from '../../repositories/in-memory/UserRepositoryImpInMemory.js';
import { CreateNewUserUseCase } from './CreateNewUserUseCase.js';

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

    const { name, email, password } = await createNewUserUseCase.execute(user);

    expect(name).toEqual(user.name);
    expect(email).toEqual(user.email);
    expect(password).toBeUndefined();
  });
});
