export const config = {
  API_URL: process.env.API_URL || 'http://localhost:5000',
  GRAPH_URL: process.env.GRAPH_URL || 'http://localhost:4000',
  IDP_URL: process.env.IDP_URL || '/login',
  TOKEN_COOKIE: process.env.TOKEN_COOKIE || 'x-temp-tarcker-token'
};
