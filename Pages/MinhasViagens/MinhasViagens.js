import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

const MyTripsScreen = () => {
  // Estado para armazenar as viagens já realizadas
  const [trips, setTrips] = useState([
    {
      id: '1',
      departure: 'São Paulo',
      destination: 'Rio de Janeiro',
      date: '2024-08-20',
      passengers: 3,
    },
    {
      id: '2',
      departure: 'Belo Horizonte',
      destination: 'Curitiba',
      date: '2024-07-15',
      passengers: 2,
    },
    {
      id: '3',
      departure: 'Porto Alegre',
      destination: 'Florianópolis',
      date: '2024-06-10',
      passengers: 4,
    },
  ]);

  // Animação de entrada dos itens na lista
  const itemAnim = useState(new Animated.Value(0))[0];

  React.useEffect(() => {
    Animated.timing(itemAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [itemAnim]);

  const itemStyle = {
    opacity: itemAnim,
    transform: [
      {
        translateY: itemAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  // Renderização de cada item da lista de viagens
  const renderItem = ({ item }) => (
    <Animated.View style={[styles.tripItem, itemStyle]}>
      <Text style={styles.tripText}>De: {item.departure}</Text>
      <Text style={styles.tripText}>Para: {item.destination}</Text>
      <Text style={styles.tripText}>Data: {item.date}</Text>
      <Text style={styles.tripText}>Passageiros: {item.passengers}</Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Viagens</Text>
      {trips.length > 0 ? (
        <FlatList
          data={trips}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noTripsText}>Você ainda não realizou nenhuma viagem.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#00d8ff',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  tripItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderColor: '#00d8ff',
    borderWidth: 1,
  },
  tripText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  noTripsText: {
    color: '#d0d0d0',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default MyTripsScreen;
