// eslint-disable-next-line import/no-extraneous-dependencies
require('babel-core/register');

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: process.env.NODE_ENV === 'test',
  define: {
    timestamps: true,
    underscore: true,
  },
};
