import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL);

async function connection() {
  try {
    await sequelize.authenticate();
    console.log('Connection successful');
  } catch (error) {
    console.error('Connection failed', error);
  }
}

export { connection, sequelize };
