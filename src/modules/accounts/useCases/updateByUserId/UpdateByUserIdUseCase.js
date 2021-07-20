class UpdateByUserIdUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(userId, { name, email }) {
    await this.repository.updateById(userId, { name, email });
  }
}

export { UpdateByUserIdUseCase };
