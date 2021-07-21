import { AppError } from '../../../shared/infra/http/errors/AppError.js';

class UserRepository {
  constructor(repository) {
    this.repository = repository;

    if (this.constructor === UserRepository) {
      throw new AppError('UserRepository is abstract class');
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  async create() {
    throw new AppError('Not implemented');
  }

  async listAll() {
    throw new AppError('Not implemented');
  }

  async showById() {
    throw new AppError('Not implemented');
  }

  async deleteById() {
    throw new AppError('Not implemented');
  }

  async updateById() {
    throw new AppError('Not implemented');
  }

  async changePasswordById() {
    throw new AppError('Not implemented');
  }

  async findOneByEmail() {
    throw new AppError('Not implemented');
  }
}

export { UserRepository };
