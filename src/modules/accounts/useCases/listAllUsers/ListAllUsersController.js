const mapper = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

class ListAllUsersController {
  constructor(listAllUserUseCase) {
    this.listAllUserUseCase = listAllUserUseCase;
  }

  async handle(request, response) {
    const users = await this.listAllUserUseCase.execute();

    const usersResponse = users.map(mapper);

    response.status(200).json(usersResponse);
  }
}

export { ListAllUsersController };
