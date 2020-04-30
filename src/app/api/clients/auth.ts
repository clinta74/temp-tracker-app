import { apiBase } from '../api-base';

export interface Token {
    sub: string;
    jti: string;
    exp: number;
    iss: string;
    aud: string;
}

export interface LoginResponse {
    token: string;
    userId: string;
}

export const login = (username: string, password: string) =>
    apiBase.client.post<LoginResponse>('auth', { username, password });