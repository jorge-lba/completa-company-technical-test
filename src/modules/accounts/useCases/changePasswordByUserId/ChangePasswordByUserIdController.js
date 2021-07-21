class ChangePasswordByUserIdController {
  constructor(changePasswordByUserId) {
    this.changePasswordByUserId = changePasswordByUserId;
  }

  async handle(request, response) {
    const { user_id } = request.params;
    const { oldPassword, newPassword } = request.body;

    const user = await this.changePasswordByUserId.execute({
      userId: user_id,
      oldPassword,
      newPassword,
    });

    return response.status(201).json(user);
  }
}

export { ChangePasswordByUserIdController };
