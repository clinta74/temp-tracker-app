import { apiBase } from '../api-base';
import { Role } from './roles';

export interface ChangePasswordRequest {
    password: string;
    oldPassword: string;
}

export interface User {
    userId: number;
    username: string;
    firstname: string;
    lastname: string;
    created: Date | string;
    roles?: Role[]
}

export interface NewUser {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    roles: string[];
}

export const get = (page?: number, limit?: number) =>
    apiBase.client.get<User[]>(`users`, { params: { page, limit } });

export const add = (user: NewUser) =>
    apiBase.client.post<number>(`users`, user);

export const update = (user: User) =>
    apiBase.client.put<number>(`users/${user.userId}`, user);

export const remove = (userId: number) =>
    apiBase.client.delete<number>(`users/${userId}`);

export const changePassword = (userId: number, password: string, oldPassword: string) =>
    apiBase.client.post(`users/${userId}/password`, { password, oldPassword });
