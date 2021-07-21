import bcrypt from 'bcrypt';

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

    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(process.env.HASH_SALT_OR_ROUNDS)
    );

    const { id } = await userRepository.create({
      ...user,
      password: hashedPassword,
    });

    const newPassword = 'newTestPassword';

    await changePasswordByUserIdUseCase.execute({
      userId: id,
      oldPassword: user.password,
      newPassword,
    });

    const userChangedPassword = userRepository.users.find(
      (user) => user.id === id
    );

    const isNewPassword = await bcrypt.compare(
      newPassword,
      userChangedPassword.password
    );

    expect(isNewPassword).toBe(true);
  });
});
