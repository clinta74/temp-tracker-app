import { apiBase } from '../api-base';

export interface Token {
  sub: string;
  jti: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string[];
  nameid: string;
  exp: number;
  iss: string;
  aud: string;
}

export interface LoginResponse {
    token: string;
}

export const login = (username: string, password: string) =>
    apiBase.client.post<LoginResponse>('auth', { username, password });