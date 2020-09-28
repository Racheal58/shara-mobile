import { http } from './client';

export const getUserOrderRequest = async () =>
  await http.get('/orders?user=true');

export const getAllOrdersRequest = async () => await http.get('/orders');
