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
    const user = await this.repository.findByPk(user_id);

    return user;
  }

  async listAll() {
    const response = await this.repository.findAll();

    const users = response.map((user) => ({
      ...user.dataValues,
    }));

    return users;
  }

  async updateById(user_id, { name, email }) {
    const user = await this.repository.findByPk(user_id);

    const updatedUser = await user.update({
      name,
      email,
    });

    return updatedUser;
  }

  async changePasswordById(user_id, password) {
    const user = await this.repository.findByPk(user_id);

    const updatedUser = await user.update({
      password,
    });

    return updatedUser;
  }

  async deleteById(user_id) {
    await this.repository.destroy({ where: { id: user_id } });
  }

  async findOneByEmail(email) {
    const user = await this.repository.findOne({
      where: { email },
    });

    return user;
  }
}

export { UserRepositoryImp };
