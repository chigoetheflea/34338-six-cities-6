import axios from 'axios';
import {HttpCode} from '../util/const';

const BASE_URL = `https://6.react.pages.academy/six-cities`;
const TIMEOUT = 5000;

export const createApi = (handleUserUnauthorized, handleServerCheck) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const handleResponseSuccess = (response) => {
    handleServerCheck(true);

    return response;
  };

  const handleResponseFail = (responseError) => {
    const {response} = responseError;

    if (response.status === HttpCode.UNAUTHORIZED) {
      handleUserUnauthorized();

      throw responseError;
    }

    if (response.status === HttpCode.NOT_FOUND) {
      handleServerCheck(false);

      throw responseError;
    }

    throw responseError;
  };

  api.interceptors.response.use(handleResponseSuccess, handleResponseFail);

  return api;
};
