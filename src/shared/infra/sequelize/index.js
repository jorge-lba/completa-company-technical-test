import { Sequelize } from 'sequelize';
import dbConfig from './config/database.cjs';

const connection = new Sequelize(dbConfig);

export { connection };
