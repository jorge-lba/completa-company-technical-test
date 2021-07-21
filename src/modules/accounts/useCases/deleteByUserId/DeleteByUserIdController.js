class DeleteByUserIdController {
  constructor(deleteByUserIdUseCase) {
    this.deleteByUserIdUseCase = deleteByUserIdUseCase;
  }

  async handle(request, response) {
    const { user_id } = request.params;

    await this.deleteByUserIdUseCase.execute(user_id);

    response.status(204).send();
  }
}

export { DeleteByUserIdController };
