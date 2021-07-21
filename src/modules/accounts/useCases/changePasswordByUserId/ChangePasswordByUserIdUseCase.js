import { compare, hash } from 'bcrypt';

class ChangePasswordByUserIdUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute({ userId, oldPassword, newPassword }) {
    const user = await this.repository.showById(userId);

    const isPasswordValid = await compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new Error('User or old password is not valid');
    }

    const password = await hash(
      newPassword,
      Number(process.env.HASH_SALT_OR_ROUNDS)
    );

    const { id, name, email, createdAt, updatedAt } =
      await this.repository.changePasswordById(userId, password);

    return {
      id,
      name,
      email,
      createdAt,
      updatedAt,
    };
  }
}

export { ChangePasswordByUserIdUseCase };
