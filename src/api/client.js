import axios from 'axios';
import { AsyncStorage } from 'react-native';

import config from '../../config';

let Authorization;
const token = AsyncStorage.getItem('token');
if (token) {
  Authorization = { Authorization: `Bearer ${token}` };
}

export const http = axios.create({
  // attach api base url here
  baseURL: config.API_URL,
  headers: { ...Authorization },
});
