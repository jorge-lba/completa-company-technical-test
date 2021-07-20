import { UserRepositoryImpInMemory } from '../../repositories/in-memory/UserRepositoryImpInMemory.js';
import { CreateNewUserUseCase } from './CreateNewUserUseCase.js';

describe('Create a new User use case', () => {
  let userRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryImpInMemory();
  });

  it('should create a new user', async () => {
    const user = {
      name: 'testName',
      email: 'user@test.com',
      password: 'testPassword',
    };

    const useCase = new CreateNewUserUseCase(userRepository);

    const { name, email, password } = await useCase.execute(user);

    expect(name).toEqual(user.name);
    expect(email).toEqual(user.email);
    expect(password).toBeUndefined();
  });
});
