class ListAllUsersUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute() {
    const users = await this.repository.listAll();
    return users;
  }
}

export { ListAllUsersUseCase };
