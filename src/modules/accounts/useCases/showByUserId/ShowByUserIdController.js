class ShowByUserIdController {
  constructor(showByUserIdUseCase) {
    this.showByUserIdUseCase = showByUserIdUseCase;
  }

  async handle(request, response) {
    const { user_id } = request.params;

    const { id, name, email, createdAt, updatedAt } =
      await this.showByUserIdUseCase.execute(user_id);

    response.status(201).json({
      id,
      name,
      email,
      createdAt,
      updatedAt,
    });
  }
}

export { ShowByUserIdController };
