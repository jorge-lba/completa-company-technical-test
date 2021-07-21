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
}

export { UserRepositoryImp };
