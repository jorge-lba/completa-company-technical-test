import { UserTokenRepository } from '../UserTokenRepository.js';

class UserTokenRepositoryImpInMemory extends UserTokenRepository {
  constructor(repository) {
    super(repository);
    this.usersToken = [];
  }
}

export { UserTokenRepositoryImpInMemory };
