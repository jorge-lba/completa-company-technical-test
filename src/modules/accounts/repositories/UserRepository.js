class UserRepository {
  constructor(repository) {
    this.repository = repository;

    if (this.constructor === UserRepository) {
      throw new Error('UserRepository is abstract class');
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  async create() {
    throw new Error('Not implemented');
  }
}

export { UserRepository };