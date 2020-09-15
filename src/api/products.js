import { http } from './client';

export const getProductsRequest = async () => await http.get('/products');

