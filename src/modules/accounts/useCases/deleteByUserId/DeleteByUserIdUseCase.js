class DeleteByUserIdUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(userId) {
    await this.repository.deleteById(userId);
  }
}

export { DeleteByUserIdUseCase };
