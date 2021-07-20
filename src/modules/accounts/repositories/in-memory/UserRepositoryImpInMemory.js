import { UserRepository } from '../UserRepository.js';

class UserRepositoryImpInMemory extends UserRepository {
  constructor(repository) {
    super(repository);
    this.users = [];
  }

  async create({ name, email, password }) {
    const user = {
      name,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    delete user.password;

    return user;
  }
}

export { UserRepositoryImpInMemory };
