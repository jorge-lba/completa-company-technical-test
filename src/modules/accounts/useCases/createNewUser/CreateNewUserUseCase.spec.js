import { UserRepositoryImpInMemory } from '../../repositories/in-memory/UserRepositoryImpInMemory.js';
import { CreateNewUserUseCase } from './CreateNewUserUseCase.js';

describe('Create a new User use case', () => {
  let userRepository;
  let useCase;

  beforeEach(() => {
    userRepository = UserRepositoryImpInMemory.getInstance();
    useCase = new CreateNewUserUseCase(userRepository);
  });

  it('should create a new user', async () => {
    const user = {
      name: 'testName',
      email: 'user@test.com',
      password: 'testPassword',
    };

    const { name, email, password } = await useCase.execute(user);

    expect(name).toEqual(user.name);
    expect(email).toEqual(user.email);
    expect(password).toBeUndefined();
  });
});
