export const config = {
  API_URL: process.env.API_URL || 'https://localhost:5001',
  IDP_URL: process.env.IDP_URL || '/login',
  TOKEN_COOKIE: process.env.TOKEN_COOKIE || 'x-temp-tarcker-token'
};
