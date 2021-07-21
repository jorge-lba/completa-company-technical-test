export default {
  secret_token: process.env.JWT_SECRET_TOKEN,
  expires_in_token: process.env.JWT_EXPIRES_IN_TOKEN,
  secret_refresh_token: process.env.JWT_SECRET_REFRESH_TOKEN,
  expires_in_refresh_token: process.env.JWT_EXPIRES_IN_REFRESH_TOKEN,
  expires_refresh_token_days: process.env.JWT_EXPIRES_REFRESH_TOKEN_DAYS,
};
