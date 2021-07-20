import { UserRepositoryImpInMemory } from '../../repositories/in-memory/UserRepositoryImpInMemory.js';
import { ListAllUsersUseCase } from './ListAllUsersUseCase.js';

describe('List all Uses use case', () => {
  let userRepository;
  let listAllUsersUseCase;

  beforeEach(() => {
    userRepository = UserRepositoryImpInMemory.getInstance();
    listAllUsersUseCase = new ListAllUsersUseCase(userRepository);
  });

  it('should list all users', async () => {
    const user = {
      name: 'testName',
      email: 'user@test.com',
      password: 'testPassword',
    };

    await userRepository.create(user);

    const response = await listAllUsersUseCase.execute();
    expect(response.length).toBeGreaterThan(0);
  });
});
