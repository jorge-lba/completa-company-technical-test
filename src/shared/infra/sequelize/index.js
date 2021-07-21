import { Sequelize } from 'sequelize';
import { Token } from '../../../modules/accounts/infra/sequelize/entities/Token.js';
import { User } from '../../../modules/accounts/infra/sequelize/entities/User.js';

import dbConfig from './config/database.cjs';

const connection = new Sequelize(dbConfig);

const connect = () => {
  User.init(connection);
  Token.init(connection);
};

export { connection, connect };
