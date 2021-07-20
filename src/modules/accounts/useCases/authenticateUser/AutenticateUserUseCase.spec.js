import { UserRepositoryImpInMemory } from '../../repositories/in-memory/UserRepositoryImpInMemory.js';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase.js';

describe('Authenticate user Use Case', () => {
  let userRepository;
  let authenticateUserUseCase;

  beforeEach(() => {
    userRepository = UserRepositoryImpInMemory.getInstance();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
  });

  it('should authenticate user', async () => {
    const user = {
      name: 'userToken',
      email: 'token@test.com',
      password: 'testToken',
    };

    await userRepository.create(user);

    const token = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(token).toBeTruthy();
  });
});
