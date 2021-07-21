import jtw from 'jsonwebtoken';

import { Token } from '../../../../modules/accounts/infra/sequelize/entities/Token.js';
import { UserTokenRepositoryImp } from '../../../../modules/accounts/infra/sequelize/repositories/UserTokenRespositoryImp.js';

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UserTokenRepositoryImp(Token);

  if (!authHeader) {
    throw new Error('Token missing');
  }

  const [, token] = authHeader.split(' ');

  console.log(token);

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
      throw new Error('User does not exists');
    }

    request.user = {
      user_id,
    };

    return next();
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export { ensureAuthenticated };
