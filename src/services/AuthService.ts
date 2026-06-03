import axiosClient from './axiosClient';

export const AuthService = {
  async login(email: string, password: string) {
    const { data } = await axiosClient.post('/auth/login', { email, password });
    return data;
  },
  async register(name: string, email: string, password: string) {
    const { data } = await axiosClient.post('/auth/register', { name, email, password });
    return data;
  },
};
