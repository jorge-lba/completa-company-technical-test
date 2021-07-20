import { UserRepositoryImpInMemory } from '../../repositories/in-memory/UserRepositoryImpInMemory.js';
import { ChangePasswordByUserIdUseCase } from './ChangePasswordByUserIdUseCase.js';

describe('Change Password user by id', () => {
  let userRepository;
  let changePasswordByUserIdUseCase;

  beforeEach(() => {
    userRepository = UserRepositoryImpInMemory.getInstance();
    changePasswordByUserIdUseCase = new ChangePasswordByUserIdUseCase(
      userRepository
    );
  });

  it('should change password by user id', async () => {
    const user = {
      name: 'testChangePassword',
      email: 'changePassword@test.com',
      password: 'testPasswordChanged',
    };

    await userRepository.create({ ...user, name: 'testChangePassword2' });
    const { id } = await userRepository.create(user);

    await changePasswordByUserIdUseCase.execute(id, 'newTestPassword');

    const userChangedPassword = userRepository.users.find(
      (user) => user.id === id
    );

    expect(userChangedPassword.password).toBe('newTestPassword');
  });
});
