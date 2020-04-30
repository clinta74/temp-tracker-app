import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Store } from 'redux';
import Cookie from 'js-cookie';
import { get } from 'lodash';
import { config } from '../../config';
import { getToken } from '../stores/auth/selectors';

export const axiosConfig = () => {
  return axios.create({
    baseURL: `${config.API_URL}/api/`,
    timeout: 240 * 1000,
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
};

export function getUploadFileConfig(onUploadProgress: (progressEvent: any) => void): AxiosRequestConfig {
  return {
    timeout: undefined,
    onUploadProgress,
    headers: {
      Accept: null,
      'Content-Type': 'multipart/form-data'
    }
  };
}

class ApiBase {
  client: AxiosInstance;

  constructor() {
    this.client = axiosConfig();

    this.client.interceptors.response.use(
      response => response,
      rejected => {
        const status = get(rejected, 'response.status', false);
        if (status === 401) {
          Cookie.remove(config.TOKEN_COOKIE);
          window.location.href = `${config.IDP_URL}?redirect=${location.href}`;
        } else {
          return Promise.reject(rejected);
        }
      }
    );
  }

  /**
   * Initialize the api client with the Redux store so that we can easily get the token.
   * @param {*} store
   */
  init(store: Store) {
    this.client.interceptors.request.use(request => {
      const token = getToken(store.getState());
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }

      return request;
    });
  }
}

export const apiBase = Object.freeze(new ApiBase());
