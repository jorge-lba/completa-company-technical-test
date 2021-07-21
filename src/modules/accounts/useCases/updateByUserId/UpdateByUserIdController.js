class UpdateByUserIdController {
  constructor(updateByUserIdUseCase) {
    this.updateByUserIdUseCase = updateByUserIdUseCase;
  }

  async handle(request, response) {
    const { user_id } = request.params;
    const { name, email } = request.body;

    const {
      id,
      name: userName,
      email: userEmail,
      createdAt,
      updatedAt,
    } = await this.updateByUserIdUseCase.execute(user_id, {
      name,
      email,
    });

    return response.status(200).json({
      id,
      name: userName,
      email: userEmail,
      createdAt,
      updatedAt,
    });
  }
}

export { UpdateByUserIdController };
