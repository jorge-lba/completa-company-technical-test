class ShowByUserIdUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(userId) {
    const user = await this.repository.showById(userId);
    return user;
  }
}

export { ShowByUserIdUseCase };
