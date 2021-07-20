import { UserRepositoryImpInMemory } from '../../repositories/in-memory/UserRepositoryImpInMemory.js';
import { UpdateByUserIdUseCase } from './UpdateByUserIdUseCase.js';

describe('Update user by id', () => {
  let userRepository;
  let updateByUserIdUseCase;

  beforeEach(() => {
    userRepository = UserRepositoryImpInMemory.getInstance();
    updateByUserIdUseCase = new UpdateByUserIdUseCase(userRepository);
  });

  it('should update user by id', async () => {
    const user = {
      name: 'testUpdate',
      email: 'update@test.com',
      password: 'testPasswordUpdate',
    };

    await userRepository.create({ ...user, name: 'testUpdate2' });
    const { id } = await userRepository.create(user);

    await updateByUserIdUseCase.execute(id, {
      name: 'UpdatedName',
      email: 'updatedEmail@test.com',
    });

    const updatedUser = await userRepository.showById(id);

    expect(updatedUser.name).toBe('UpdatedName');
    expect(updatedUser.email).toBe('updatedEmail@test.com');
  });
});
