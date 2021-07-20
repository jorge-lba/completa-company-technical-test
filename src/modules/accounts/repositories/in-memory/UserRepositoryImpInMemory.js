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

    return {
      id: user.id,
      name,
      email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
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

    return {
      id: user.id,
      name: newDataUser.name,
      email: newDataUser.email,
      createdAt: newDataUser.createdAt,
      updatedAt: newDataUser.updatedAt,
    };
  }

  async changePasswordById(userId, newPassword) {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    const user = this.users[userIndex];

    const newDataUser = {
      ...user,
      password: newPassword,
      updatedAt: new Date(),
    };

    this.users[userIndex] = newDataUser;
  }
}

UserRepositoryImpInMemory.getInstance();

export { UserRepositoryImpInMemory };
