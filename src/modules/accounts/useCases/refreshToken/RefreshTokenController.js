class RefreshTokenController {
  constructor(refreshTokenUseCase) {
    this.refreshTokenUseCase = refreshTokenUseCase;
  }

  async handle(request, response) {
    const refresh_token =
      request.body.token ||
      request.header['x-access-token'] ||
      request.query.token;

    const token = await this.refreshTokenUseCase.execute(refresh_token);

    return response.status(200).json({
      refresh_token: token,
    });
  }
}

export { RefreshTokenController };
