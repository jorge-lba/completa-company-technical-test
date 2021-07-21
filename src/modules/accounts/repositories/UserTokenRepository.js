import { AppError } from '../../../shared/infra/http/errors/AppError.js';

class UserTokenRepository {
  constructor(repository) {
    this.repository = repository;

    if (this.constrictor === UserTokenRepository) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  async save() {
    throw new AppError('Not implemented');
  }

  async findByUserIdAndRefreshToken() {
    throw new AppError('Not implemented');
  }

  async deleteById() {
    throw new AppError('Not implemented');
  }
}

export { UserTokenRepository };
