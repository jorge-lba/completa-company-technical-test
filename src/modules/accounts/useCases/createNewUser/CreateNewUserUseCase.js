class CreateNewUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const user = await this.userRepository.create({ name, email, password });
    return user;
  }
}

export { CreateNewUserUseCase };
