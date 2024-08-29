import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './Pages/Login/Login';
import Cadastro from './Pages/Cadastrar/Cadastrar';  
import SolicitarCarona from './Pages/SolicitarCarona/SolicitarCarona'; 
import OferecerCarona from './Pages/OferecerCarona/OferecerCarona';  
import MinhasViagens from './Pages/MinhasViagens/MinhasViagens';  
import Perfil from './Pages/Perfil/Perfil'; 

const Tab = createBottomTabNavigator();

const BotaoNavegacao = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Login') {
            iconName = focused ? 'log-in' : 'log-in-outline';
          } else if (route.name === 'Cadastro') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          } else if (route.name === 'SolicitarCarona') {
            iconName = focused ? 'search' : 'search-outline'; 
          }
           else if (route.name === 'OferecerCarona') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00d8ff',
        tabBarInactiveTintColor: '#d0d0d0',
        tabBarStyle: {
          backgroundColor: '#1e1e1e',
          borderTopWidth: 0,
          elevation: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Cadastro" component={Cadastro} />
      <Tab.Screen name="Buscar Carona" component={SolicitarCarona} />
      <Tab.Screen name="OferecerCarona" component={OferecerCarona} />
      <Tab.Screen name="MinhasViagens" component={MinhasViagens} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
};

export default BotaoNavegacao;
