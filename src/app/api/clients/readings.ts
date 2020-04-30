import { apiBase } from '../api-base';

export interface Reading {
    readingId: string;
    value: number;
    scale: number;
    taken: string;
}

export const get = () =>
    apiBase.client.get<Reading[]>('readings');

export const getById = (readingId: string) =>
    apiBase.client.get<Reading>(`readings/${readingId}`);

export const add = (value: number) =>
    apiBase.client.post<string>('readings', { value, scale: 1 });

export const remove = (readingId: string) =>
    apiBase.client.delete<Reading>(`readings/${readingId}`);
