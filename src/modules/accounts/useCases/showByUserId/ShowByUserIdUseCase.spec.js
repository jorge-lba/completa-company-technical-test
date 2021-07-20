import { UserRepositoryImpInMemory } from '../../repositories/in-memory/UserRepositoryImpInMemory.js';
import { ShowByUserIdUseCase } from './ShowByUserIdUseCase.js';

describe('Show by User id use case', () => {
  let userRepository;
  let showByUserIdUseCase;

  beforeEach(() => {
    userRepository = UserRepositoryImpInMemory.getInstance();
    showByUserIdUseCase = new ShowByUserIdUseCase(userRepository);
  });

  it('should return user', async () => {
    const user = {
      name: 'Test Show',
      email: 'show@test.com',
      password: 'testShow',
    };

    await userRepository.create(user);
    const { id } = await userRepository.create(user);

    const result = await showByUserIdUseCase.execute(id);

    expect(result).toBeDefined();
    expect(result.name).toBe(user.name);
    expect(result.email).toBe(user.email);
  });
});
