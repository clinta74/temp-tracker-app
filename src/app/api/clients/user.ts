import { apiBase } from '../api-base';

export interface ChangePasswordRequest {
    password: string;
    oldPassword: string;
}

export const changePassword = (userId: number, password: string, oldPassword: string) => 
    apiBase.client.post(`user/${userId}/password`, { password, oldPassword });
