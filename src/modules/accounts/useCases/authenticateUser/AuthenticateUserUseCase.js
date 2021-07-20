class AuthenticateUserUseCase {
  constructor(userTokenRepository) {
    this.userTokenRepository = userTokenRepository;
  }

  async execute({ nickname, password }) {
    const token = await this.userTokenRepository.authenticate({
      nickname,
      password,
    });
    return token;
  }
}

export { AuthenticateUserUseCase };
