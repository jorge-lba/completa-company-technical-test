class CreateNewUserController {
  constructor(createNewUserUseCase) {
    this.createNewUserUseCase = createNewUserUseCase;
  }

  async handle(request, response) {
    const { name, email, password } = request.body;

    const user = await this.createNewUserUseCase.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  }
}

export { CreateNewUserController };
