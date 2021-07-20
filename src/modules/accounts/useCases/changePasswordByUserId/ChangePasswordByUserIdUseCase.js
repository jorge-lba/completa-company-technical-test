class ChangePasswordByUserIdUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(userId, newPassword) {
    await this.repository.changePasswordById(userId, newPassword);
  }
}

export { ChangePasswordByUserIdUseCase };
