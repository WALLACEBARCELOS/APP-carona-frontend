import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://172.119.20.57:8080', // Altere conforme necessário
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para autenticar o usuário
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data.token; // Retorna o token ou qualquer outro dado que você precisar
  } catch (error) {
    console.error("Erro ao fazer login:", error); // Log de erro
    throw error; // Lança o erro para ser tratado em outro lugar
  }
};

// Interceptor para adicionar o token JWT no cabeçalho Authorization
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
