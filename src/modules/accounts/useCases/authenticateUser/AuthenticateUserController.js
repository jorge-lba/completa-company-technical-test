class AuthenticateUserController {
  constructor(authenticateUserUseCase) {
    this.authenticateUserUseCase = authenticateUserUseCase;
  }

  async handle(request, response) {
    const { email, password } = request.body;

    const result = await this.authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.status(201).json(result);
  }
}

export { AuthenticateUserController };
