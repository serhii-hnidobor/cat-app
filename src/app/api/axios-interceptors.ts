import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

const instance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
});

instance.interceptors.request.use(
  (config) => {
    const token = 'live_NGxqAlPWWX4dUfYcV7FQDx5XInW4HdVIsYL7zB7VhGnIvgnaT7H18tF7A0KAy7WJ';
    if (token) {
      config.headers['x-api-key'] = token;
    }
    return config;
  },
  (error) => {
    return error.data.message;
  }
);

export default instance;
