import { UserTokenRepository } from '../UserTokenRepository';

class UserTokenRepositoryImpInMemory extends UserTokenRepository {
  constructor(repository) {
    super(repository);
    this.usersToken = [];
  }
}

export { UserTokenRepositoryImpInMemory };