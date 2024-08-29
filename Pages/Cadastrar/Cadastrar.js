import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, Keyboard, TouchableWithoutFeedback } from 'react-native';

const Cadastro = ({ navigation }) => {
  const titleAnim = useRef(new Animated.Value(0)).current;
  const inputAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

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
        <Animated.Text style={[styles.title, titleStyle]}>Criar Conta</Animated.Text>
        <Animated.View style={[styles.inputContainer, inputStyle]}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#d0d0d0"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#d0d0d0"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#d0d0d0"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            placeholderTextColor="#d0d0d0"
            secureTextEntry
          />
        </Animated.View>
        <Animated.View style={[styles.buttonContainer, buttonStyle]}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Já tem uma conta? Faça login</Text>
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

export default Cadastro;
