import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Easing, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Perfil = () => {

  const profileImageAnim = React.useState(new Animated.Value(0))[0];
  const buttonAnim = React.useState(new Animated.Value(0))[0];

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(profileImageAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 1000,
        delay: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();
  }, [profileImageAnim, buttonAnim]);

  const profileImageStyle = {
    opacity: profileImageAnim,
    transform: [
      {
        scale: profileImageAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
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
          outputRange: [30, 0],
        }),
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View style={[styles.profileImageContainer, profileImageStyle]}>
        <Image
          source={{ uri: 'https://www.example.com/profile.jpg' }} // Substitua pelo URL da imagem de perfil
          style={styles.profileImage}
        />
      </Animated.View>

      <Text style={styles.name}>João Silva</Text>
      <Text style={styles.jobTitle}>Desenvolvedor de Software</Text>
      <Text style={styles.location}>São Paulo, SP</Text>

      <Text style={styles.description}>
        Apaixonado por tecnologia e viagens. Sempre em busca de novos desafios e experiências.
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>Viagens Oferecidas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Caronas Aceitas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>4.8</Text>
          <Text style={styles.statLabel}>Avaliação</Text>
        </View>
      </View>

      <Animated.View style={[styles.buttonContainer, buttonStyle]}>
        <TouchableOpacity style={styles.button}>
          <Icon name="edit" size={24} color="#fff" />
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="map-pin" size={24} color="#fff" />
          <Text style={styles.buttonText}>Ver Viagens</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="settings" size={24} color="#fff" />
          <Text style={styles.buttonText}>Configurações</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  profileImageContainer: {
    marginBottom: 20,
    borderRadius: 100,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 18,
    color: '#00d8ff',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: '#d0d0d0',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#d0d0d0',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00d8ff',
  },
  statLabel: {
    fontSize: 14,
    color: '#d0d0d0',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#00d8ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#00d8ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Perfil;
