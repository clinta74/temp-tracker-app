import { apiBase } from '../api-base';


export interface Role {
    roleId: number;
    name: string;
    description: string;
}

export const get = (page?: number, limit?: number) =>
    apiBase.client.get<Role[]>(`users`, { params: { page, limit } });