import axios from 'axios';
import { AsyncStorage } from 'react-native';

import config from '../../config';

let http;

(async () => {
  let Authorization;
  const token = await AsyncStorage.getItem('token');

  if (token) {
    Authorization = { Authorization: `Bearer ${token}` };
  }

  http = axios.create({
    baseURL: config.API_URL,
    headers: { ...Authorization },
  });
})();

export { http };
