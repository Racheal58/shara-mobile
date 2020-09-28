import { http } from './client';

export const getProductsRequest = async () => await http.get('/products');

export const addProductToOrderRequest = async credentials =>
  await http.post('/orders/addproduct', credentials);

export const removeProductFromOrderRequest = async (orderId, productId) =>
  await http.delete(`/orders/${orderId}/removeproduct/${productId}`);

export const editProductQuantityRequest = async (
  orderId,
  productId,
  quantity,
) =>
  await http.put(`/orders/${orderId}/editproduct/${productId}`, { quantity });

export const completeUserOrderRequest = async orderId =>
  await http.post(`/orders/complete/${orderId}`);
