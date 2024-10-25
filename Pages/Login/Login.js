import React, { useRef, useEffect, useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { AuthContext } from '../../AuthContext'; // Importa o AuthContext
import { api, loginUser } from '../../Api/Api';

const Login = ({ navigation }) => {
  const titleAnim = useRef(new Animated.Value(0)).current;
  const inputAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser: login } = useContext(AuthContext); // Aqui você acessa o loginUser


  const handleLogin = async () => {
    console.log("E-mail sendo enviado:", email);
    try {
      const token = await login(email, password); // Chama a função loginUser
      navigation.navigate('SolicitarCarona'); // Navega para a tela inicial após o login
    } catch (error) {
      console.error("Erro ao fazer login:", error); // Loga o erro
      Alert.alert('Erro de autenticação', 'Usuário ou senha inválidos');
    }
  };
  


  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(inputAnim, {
        toValue: 1,
        duration: 1000,
        delay: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 1000,
        delay: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();
  }, [titleAnim, inputAnim, buttonAnim]);

  const titleStyle = {
    opacity: titleAnim,
    transform: [
      {
        translateY: titleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0],
        }),
      },
    ],
  };

  const inputStyle = {
    opacity: inputAnim,
    transform: [
      {
        translateY: inputAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  const buttonStyle = {
    opacity: buttonAnim,
    transform: [
      {
        translateY: buttonAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Animated.Text style={[styles.title, titleStyle]}>UNICAR</Animated.Text>
        <Animated.View style={[styles.inputContainer, inputStyle]}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#d0d0d0"
            value={email} // Vincula o valor do input ao estado
            onChangeText={setEmail} // Atualiza o estado ao digitar
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#d0d0d0"
            secureTextEntry
            value={password} // Vincula o valor do input ao estado
            onChangeText={setPassword} // Atualiza o estado ao digitar
          />
        </Animated.View>
        <Animated.View style={[styles.buttonContainer, buttonStyle]}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastrar')}>
          <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#00d8ff',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#00d8ff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#00d8ff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00d8ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 20,
  },
  buttonText: {
    color: '#1e1e1e',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#00d8ff',
    fontSize: 16,
  },
});

export default Login;
