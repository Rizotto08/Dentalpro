import axios from 'axios';

const api = axios.create({
  baseURL: 'https://organic-yodel-q74wvr5w9pqqf64jj-3000.app.github.dev',
  timeout: 10000,
});

export const setAuthToken = (token) => {
  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : undefined;
};

export default api;
