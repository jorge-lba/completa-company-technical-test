class UpdateByUserIdUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(userId) {
    await this.repository.updateById(userId);
  }
}

export { UpdateByUserIdUseCase };
