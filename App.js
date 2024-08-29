import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext, AuthProvider } from './VerificarAutenticacao';

// Importando telas
import Login from './Pages/Login/Login';
import Cadastrar from './Pages/Cadastrar/Cadastrar';
import SolicitarCarona from './Pages/SolicitarCarona/SolicitarCarona';
import OferecerCarona from './Pages/OferecerCarona/OferecerCarona'; 
import MinhasViagens from './Pages/MinhasViagens/MinhasViagens'; 
import Perfil from './Pages/Perfil/Perfil';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#00d8ff',
      tabBarInactiveTintColor: '#d0d0d0',
    })}
  >
    <Tab.Screen name="SolicitarCarona" component={SolicitarCarona} />
    <Tab.Screen name="OferecerCarona" component={OferecerCarona} />
    <Tab.Screen name="MinhasViagens" component={MinhasViagens} />
    <Tab.Screen name="Perfil" component={Perfil} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <BottomTabNavigator />
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastrar" component={Cadastrar} />
          <Stack.Screen name="SolicitarCarona" component={SolicitarCarona} />
          <Stack.Screen name="OferecerCarona" component={OferecerCarona} />
          <Stack.Screen name="MinhasViagens" component={MinhasViagens} />
          <Stack.Screen name="Perfil" component={Perfil} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
