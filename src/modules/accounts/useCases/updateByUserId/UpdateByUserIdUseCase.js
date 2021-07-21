class UpdateByUserIdUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(userId, { name, email }) {
    const user = await this.repository.updateById(userId, { name, email });
    return user;
  }
}

export { UpdateByUserIdUseCase };
