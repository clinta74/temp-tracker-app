import { apiBase } from './api-base';

export { axiosConfig } from './api-base';
export const { client, init } = apiBase;

import * as Auth from './clients/auth';
import * as Readings from './clients/readings';
import * as User from './clients/user';

export const Api = {
    Auth,
    Readings,
    User,
};
