import { UserRepositoryImpInMemory } from '../../repositories/in-memory/UserRepositoryImpInMemory';

describe('Delete user by id', () => {
  let userRepository;
  let deleteByUserIdUseCase;

  beforeEach(() => {
    userRepository = UserRepositoryImpInMemory.getInstance();
    deleteByUserIdUseCase = new DeleteByUserIdUseCase(userRepository);
  });

  it('should delete user by id', async () => {
    const user = {
      name: 'testDelete',
      email: 'delete@test.com',
      password: 'testPasswordDelete',
    };

    const { id } = await userRepository.create(user);

    await deleteByUserIdUseCase.execute(id);

    const userAfterDelete = await userRepository.showById(id);

    expect(userAfterDelete).toBeUndefined();
  });
});
