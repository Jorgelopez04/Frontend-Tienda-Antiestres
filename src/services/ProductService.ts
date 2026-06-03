import axiosClient from './axiosClient';

export const ProductService = {
  async getAll(page = 1, limit = 10) {
    const { data } = await axiosClient.get(`/products?page=${page}&limit=${limit}`);
    return data;
  },
  async getById(id: string) {
    const { data } = await axiosClient.get(`/products/${id}`);
    return data;
  },
  async create(product: any) {
    const { data } = await axiosClient.post('/products', product);
    return data;
  },
  async update(id: string, product: any) {
    const { data } = await axiosClient.put(`/products/${id}`, product);
    return data;
  },
  async remove(id: string) {
    await axiosClient.delete(`/products/${id}`);
  },
};
