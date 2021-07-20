import { UserRepositoryImpInMemory } from '../../repositories/in-memory/UserRepositoryImpInMemory.js';

describe('List all Uses use case', () => {
  let userRepository;
  let useCase;

  beforeEach(() => {
    userRepository = UserRepositoryImpInMemory.getInstance();
    useCase = ListAllUsersUseCase(userRepository);
  });

  it('should list all users', async () => {
    const response = await ListAllUsersUseCase.execute();
    expect(response.length).toBeGreaterThan(0);
  });
});
