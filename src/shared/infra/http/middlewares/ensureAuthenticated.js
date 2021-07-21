import jtw from 'jsonwebtoken';

import { Token } from '../../../../modules/accounts/infra/sequelize/entities/Token.js';
import { UserTokenRepositoryImp } from '../../../../modules/accounts/infra/sequelize/repositories/UserTokenRespositoryImp.js';
import { AppError } from '../errors/AppError.js';

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UserTokenRepositoryImp(Token);

  if (!authHeader) {
    throw new AppError('Token missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = jtw.verify(
      token,
      process.env.JWT_SECRET_REFRESH_TOKEN
    );

    const isTokenValid = await userTokensRepository.findByUserIdAndRefreshToken(
      {
        user_id,
        refresh_token: token,
      }
    );

    if (!isTokenValid) {
      throw new AppError('User does not exists');
    }

    request.user = {
      user_id,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid token');
  }
}

export { ensureAuthenticated };
