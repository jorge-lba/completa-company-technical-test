import { v4 as uuid } from 'uuid';

import { User } from '../entities/User.js';
import { UserRepository } from '../../../repositories/UserRepository.js';

class UserRepositoryImp extends UserRepository {
  constructor() {
    super();
    this.repository = User;
  }

  async create({ name, email, password }) {
    const id = uuid();
    const user = await this.repository.create({
      id,
      name,
      email,
      password,
    });

    return user;
  }

  async showById(user_id) {
    const { id, name, email, createdAt, updatedAt } =
      await this.repository.findByPk(user_id);

    return {
      id,
      name,
      email,
      createdAt,
      updatedAt,
    };
  }

  async listAll() {
    const response = await this.repository.findAll();

    const users = response.map((user) => ({
      ...user.dataValues,
    }));

    return users;
  }
}

export { UserRepositoryImp };
