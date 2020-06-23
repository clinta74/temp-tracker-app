import { createSelector } from 'reselect';
import jwt_decode from 'jwt-decode';
import { RootStateType } from '../root/reducer';
import { Token } from '../../api/clients/auth';

const getStoreState = (state: RootStateType) => {
    return state.auth
}

export const getToken = createSelector(
    getStoreState,
    ({ token }) => token
);

export const getIsAuthenticated = createSelector(
    getToken,
    (token) => !!token
);

export const getDecoded = createSelector(
    getStoreState,
    ({ token }) => {
        try {
            if (token) {
                return jwt_decode<Token>(token);
            } else {
                return { } as Token;
            }
        }
        catch (e) {
            return { } as Token;
        }
    }
);

export const getIsExpired = createSelector(
    getDecoded,
    (token) => token && token.exp * 1000 < Date.now()
);

export const getRoles = createSelector(
    getDecoded,
    (token) => token ? token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : []
)

export const getUserId = createSelector(
    getDecoded,
    (token) => token ? Number(token.nameid) : 0
);