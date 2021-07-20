import { v4 as uuid } from 'uuid';

import { UserRepository } from '../UserRepository.js';

class UserRepositoryImpInMemory extends UserRepository {
  constructor(repository) {
    super(repository);
    this.users = [];
  }

  async create({ name, email, password }) {
    const user = {
      id: uuid(),
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

  async listAll() {
    return this.users;
  }

  async showById(userId) {
    return this.users.find((user) => user.id === userId);
  }

  async deleteById(userId) {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    this.users.splice(userIndex, 1);
  }

  async updateById(userId, { name, email }) {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    const user = this.users[userIndex];

    const newDataUser = {
      ...user,
      name,
      email,
      updatedAt: new Date(),
    };

    this.users[userIndex] = newDataUser;

    delete newDataUser.password;

    return newDataUser;
  }
}

UserRepositoryImpInMemory.getInstance();

export { UserRepositoryImpInMemory };
