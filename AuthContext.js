// src/Context/AuthContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './Api/Api';

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, token: action.payload.token, user: action.payload.user, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, token: null, user: null, isAuthenticated: false };
    case 'RESET':
      return initialState; // Reseta o estado para o inicial
    default:
      return state;
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginUser = async (email, senha) => {
    try {
      const response = await api.post("/auth/login", { email, senha });
      console.log("Resposta do login:", response.data);
      
      const { token, name } = response.data;

      // Verifica se token e nome estão disponíveis
      if (!token || !name) {
        throw new Error("Token ou usuário não retornado.");
      }

      // Armazenar token no AsyncStorage
      await AsyncStorage.setItem("authToken", token);

      // Salvar no estado global (nome do usuário e token)
      dispatch({ type: 'LOGIN', payload: { token, user: name } });
    } catch (e) {
      console.log("Erro no login:", e);
      throw new Error('Falha ao fazer login: ' + e.message);
    }
  };

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem("authToken"); // Remove o token do AsyncStorage
      dispatch({ type: 'LOGOUT' }); // Atualiza o estado global para desautenticado
    } catch (e) {
      console.log("Erro ao fazer logout:", e);
    }
  };

  const resetState = async () => {
    await AsyncStorage.removeItem("authToken"); // Limpar o token do AsyncStorage
    dispatch({ type: 'RESET' }); // Redefinir o estado
  };

  // Função para verificar se já há um token armazenado no início
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        // Se o token estiver disponível, atualiza o estado
        dispatch({ type: 'LOGIN', payload: { token: storedToken, user: null } }); // Substitua null pelo nome do usuário se disponível
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, loginUser, logoutUser, resetState }}>
      {children}
    </AuthContext.Provider>
  );
};
