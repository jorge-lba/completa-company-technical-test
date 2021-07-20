class AuthenticateUserUseCase {
  constructor(userTokenRepository) {
    this.userTokenRepository = userTokenRepository;
  }

  async execute({ email, password }) {
    const token = await this.userTokenRepository.authenticate({
      email,
      password,
    });
    return token;
  }
}

export { AuthenticateUserUseCase };
